## Context

`CacheService` (`providedIn: 'root'`) es un `Map<string, CacheEntry<unknown>>` genérico que no valida la forma del valor. Dos consumidores cachean datos de relacionadas bajo la **misma clave** (la URL de TMDb `${tmdbApiUrl}/movie/{movieId}/{relation}`):

- `DetailService.getRelatedMovies()` → escribe un **objeto** `PaginatedMovies` (primera página) para el carrusel del detalle (`MovieList`).
- `TmdbService.getPaginatedMovies()` (vía `getPaginatedMoviesBasedIn()`) → escribe un **array** `PaginatedMovies[]` (páginas acumuladas) para el listado "Ver todas" con scroll infinito (`LoadRelated` → `InfiniteScroll`).

El primero que escribe ocupa el slot; el segundo lee la forma equivocada. Comportamiento reproducido en navegador:

- Detalle → "Ver todas": `getPaginatedMovies` hace `const cached = get(url) ?? []`; al ser un objeto (no `null`), `?? []` no aplica y `[...cached, response]` falla con `TypeError: cached is not iterable` → el `rxResource` queda en error → listado vacío.
- "Ver todas" → detalle: `getRelatedMovies` devuelve el array vía `of(cached)` y `map(({ results }) => results)` da `undefined` → carrusel reemplazado por una notificación vacía.

## Goals / Non-Goals

**Goals:**
- Eliminar la colisión: cada consumidor usa su propia entrada de caché y nunca lee la forma del otro.
- Mantener el cacheo (rendimiento) de ambos flujos y los TTL actuales.
- Cobertura de pruebas que fije el contrato de claves separadas y evite regresiones.

**Non-Goals:**
- Rediseñar `CacheService` o introducir validación de tipos en runtime.
- Unificar ambas representaciones en una sola forma.
- Cambiar UI, scroll infinito o contratos de los componentes.

## Decisions

**Decisión: clave de caché diferenciada para el listado paginado.**
En `TmdbService.getPaginatedMovies()`, derivar la clave de caché añadiendo un sufijo estable al `url` (p. ej. `${url}::paginated`) y usar esa clave tanto en `get` como en `set`. `getRelatedMovies()` se deja intacto usando la URL base. Así las dos entradas son ortogonales aunque correspondan al mismo endpoint TMDb.

- Rationale: cambio mínimo, localizado en un solo método, sin tocar consumidores ni la firma pública. El sufijo documenta la intención (entrada de paginación acumulada).
- Alternativa A (caché defensiva: normalizar objeto→array al leer): oculta el síntoma pero deja la colisión latente; si cambia el orden de escritura vuelve a romper. Descartada.
- Alternativa B (unificar a `PaginatedMovies[]` en ambos): más invasiva, toca `DetailService`, `MovieList` y sus pruebas; mayor superficie de regresión para un bug de caché. Descartada.

**Decisión: el sufijo se aplica dentro de `getPaginatedMovies`, no en los call sites.**
`getPaginatedMovies` ya recibe la `url` construida por `getPaginatedMoviesByCategory`/`getPaginatedMoviesBasedIn`. Aplicar el sufijo en el método centraliza la regla y cubre ambos orígenes de paginación sin duplicar lógica.

## Risks / Trade-offs

- [Duplicación de datos en caché: misma primera página guardada como objeto y dentro del array] → Aceptable; son entradas pequeñas, en memoria y con TTL; el beneficio es aislamiento total.
- [Otra ruta futura podría volver a colisionar con la URL base] → Mitigación: el spec fija el requisito de claves separadas y las pruebas lo verifican, sirviendo de guardarraíl.
- [El sufijo elegido podría chocar con caracteres de la URL] → Mitigación: usar un separador improbable en URLs TMDb (`::paginated`) y verificarlo en prueba.

## Migration Plan

Sin migración de datos (caché en memoria, efímera por sesión). Despliegue directo. Rollback: revertir el commit; al reiniciar la app la caché se reconstruye con la clave anterior.
