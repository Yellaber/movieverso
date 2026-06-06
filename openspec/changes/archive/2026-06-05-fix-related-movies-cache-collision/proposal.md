## Why

El carrusel de relacionadas del detalle y el listado paginado "Ver todas" comparten la misma clave de caché (la URL `…/movie/{movieId}/{relation}`) en el `CacheService` global, pero guardan formas de dato incompatibles: un objeto `PaginatedMovies` vs. un array `PaginatedMovies[]`. Quien escribe primero corrompe la lectura del otro, produciendo dos fallos visibles bidireccionales.

## What Changes

- `TmdbService.getPaginatedMovies()` usará una clave de caché diferenciada (con sufijo, p. ej. `…/{relation}::paginated`) para el array acumulado de páginas, de modo que no colisione con la entrada de objeto único que escribe `DetailService.getRelatedMovies()`.
- `DetailService.getRelatedMovies()` mantiene su clave (la URL base) sin cambios.
- Se añaden pruebas unitarias que verifican que ambos métodos cachean bajo claves distintas y que tras consumir uno, el otro sigue obteniendo su forma correcta.
- Sin cambios de API pública, de plantillas, ni breaking changes.

## Capabilities

### New Capabilities
- `related-movies-cache`: Define el contrato de cacheo de películas relacionadas/recomendadas/similares, garantizando que el carrusel del detalle (objeto de primera página) y el listado paginado con scroll infinito (array de páginas) usen entradas de caché independientes y nunca interfieran entre sí.

### Modified Capabilities
<!-- Ninguna: las capabilities existentes (carousel-state-cache, route-scroll-cache, trailer-state-management, etc.) no cubren el cacheo de datos de relacionadas. -->

## Impact

- Código: `src/app/shared/services/tmdb-service.ts` (clave de caché en `getPaginatedMovies`); pruebas en `tmdb-service.spec.ts` y, si aplica, `detail-service.spec.ts`.
- Datos/caché: nueva clave lógica para listados paginados; sin migración (caché en memoria, efímera).
- Sin impacto en API TMDB, SSR, ni en componentes consumidores (`MovieList`, `LoadRelated`/`InfiniteScroll`) más allá de recibir datos correctos.

## Non-goals

- No se rediseña `CacheService` ni se introduce validación de esquema/tipado en tiempo de ejecución para todas las entradas.
- No se unifican ambas representaciones en una sola forma de dato.
- No se modifica el comportamiento del scroll infinito ni la UI de los carruseles/listados.

## Rollback plan

Revertir el commit del cambio. Al ser caché en memoria y sin migraciones, basta con restaurar la clave anterior en `getPaginatedMovies`; no quedan datos persistidos que limpiar.
