## 1. Corrección de la clave de caché

- [x] 1.1 En `src/app/shared/services/tmdb-service.ts`, dentro de `getPaginatedMovies`, derivar una clave de caché diferenciada a partir de `url` (sufijo estable, p. ej. `${url}::paginated`) y usarla en las llamadas `cacheService.get` y `cacheService.set`, dejando `getRelatedMovies` (DetailService) sin cambios.
- [x] 1.2 Verificar que `getPaginatedMoviesByCategory` y `getPaginatedMoviesBasedIn` siguen funcionando con la nueva clave (ambos pasan por `getPaginatedMovies`).

## 2. Pruebas unitarias

- [x] 2.1 En `tmdb-service.spec.ts`, añadir prueba: tras `getRelatedMovies` cachear un objeto en la URL base, `getPaginatedMoviesBasedIn` (misma relación/movieId) NO lanza error y devuelve un `PaginatedMovies[]` válido (cubre Bug #1 / "cached is not iterable").
- [x] 2.2 Añadir prueba: tras `getPaginatedMovies` cachear un array, `DetailService.getRelatedMovies` (misma relación/movieId) devuelve un objeto `PaginatedMovies` con `results` definido (cubre Bug #2 / carrusel vacío).
- [x] 2.3 Añadir prueba de idempotencia: dos llamadas a `getPaginatedMovies` con los mismos parámetros usan una única entrada de caché y respetan el TTL; la clave incluye el sufijo de paginación.
- [x] 2.4 Añadir prueba de acumulación: solicitar páginas sucesivas anexa al array existente sin errores de iteración.

## 3. Verificación y cierre

- [x] 3.1 Ejecutar `npm test` (suite de Jest) y confirmar que pasa, incluidas las nuevas pruebas.
- [x] 3.2 Verificar manualmente en navegador el flujo del reporte: detalle → carrusel "Recomendadas" → "Ver todas" (listado se muestra) → volver al detalle (carrusel se mantiene), y el orden inverso.
- [x] 3.3 Confirmar ausencia de errores en consola (`cached is not iterable`) durante el flujo.
- [x] 3.4 Commit con mensaje convencional (p. ej. `fix(cache): separar claves de cache de relacionadas para evitar colision`).
