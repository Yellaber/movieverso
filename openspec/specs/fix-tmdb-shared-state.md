# Spec: Fix Estado Compartido en TmdbService (paginatedMovies)

## Contexto

`TmdbService` tiene un campo `private paginatedMovies: PaginatedMovies[] = []` que actúa como acumulador de páginas. Este array es **compartido** entre `getPaginatedMoviesByCategory()` y `getPaginatedMoviesBasedIn()`. Si ambos métodos se invocan en la misma instancia del servicio con distintos recursos, el array acumula datos de rutas incompatibles.

Ejemplo del bug:
1. Navegar a `/popular` → `getPaginatedMoviesByCategory('popular', 1)` llena `paginatedMovies`
2. Navegar a `/movie/123` → `getPaginatedMoviesBasedIn('recommendations', 123, 1)` **resetea y sobreescribe** el mismo array

## Objetivo

Eliminar el estado mutable compartido `paginatedMovies`. La acumulación de páginas debe derivarse de la caché, no de un array de instancia.

## No-goals

- No cambiar la API pública de `TmdbService` (`getPaginatedMoviesByCategory`, `getPaginatedMoviesBasedIn` mantienen la misma firma).
- Este spec depende de `CacheService` para la nueva implementación de caché.

## Solución

Derivar la lista acumulada a partir de la URL base como clave de caché. Cada URL base almacena el array completo de páginas acumuladas:

```typescript
private getPaginatedMovies(url: string, params: Params): Observable<PaginatedMovies[]> {
  if (params.page! <= 0) return of([]);

  // Recuperar páginas ya cargadas para esta URL
  const cached = this.cacheService.get<PaginatedMovies[]>(url) ?? [];

  if (params.page === 1 && cached.length > 0) {
    return of(cached); // caché de primera página
  }

  if (params.page! <= cached.length) {
    return of(cached); // página ya cargada
  }

  return this.httpClient.get<PaginatedMovies>(url, { params: { ...params } }).pipe(
    map(response => {
      const updated = [...cached, response];
      this.cacheService.set(url, updated, 5 * 60 * 1000);
      return updated;
    })
  );
}
```

## Diferencia clave con el código actual

| Aspecto | Actual | Propuesto |
|---------|--------|-----------|
| Acumulación | Array de instancia `paginatedMovies[]` | Derivado de `CacheService` por URL |
| Concurrencia | ❌ Se pisan entre sí | ✅ Aislado por clave URL |
| Reset página 1 | `this.paginatedMovies = []` | Implícito: clave distinta o expirado |
| Testabilidad | Requiere resetear estado interno | CacheService es inyectable/mockeable |

## Archivos a actualizar

- `src/app/shared/services/tmdb-service.ts`
  - Eliminar `private paginatedMovies: PaginatedMovies[] = []`
  - Refactorizar `getPaginatedMovies()` según esquema propuesto
  - Requiere `CacheService` inyectado (ver spec `cache-service.md`)

## Tests requeridos

Los tests existentes en `tmdb-service.spec.ts` ya cubren el comportamiento esperado (cache en página 1, acumulación en página 2, retorno desde caché). Deben **pasar sin modificación** tras el refactor. Si alguno falla, indica una regresión.

Agregar test adicional:
- Llamar `getPaginatedMoviesByCategory('popular', 1)` y luego `getPaginatedMoviesBasedIn('recommendations', 123, 1)` → cada uno debe retornar su propio conjunto de datos independientemente.
