## Why

Cuando el usuario aplica un filtro y pulsa **"Mostrar resultados"**, la aplicación navega a `/search` y muestra los resultados, pero el modal de filtros permanece abierto encima de ellos. Esto obliga al usuario a cerrar el modal manualmente para ver lo que pidió, generando fricción innecesaria.

## What Changes

- Al pulsar **"Mostrar resultados"** (formulario válido), el modal de filtros se cierra automáticamente tras aplicar el filtro y navegar a los resultados.
- El componente `FormFilter` notifica al contenedor (`FilterModalMovies`) que debe cerrarse, reutilizando la animación y limpieza existentes en `onClose()` (desbloqueo de scroll, ocultar overlay).
- El cierre solo ocurre cuando el formulario es válido; si es inválido, el modal permanece abierto mostrando los errores de validación (comportamiento actual sin cambios).

## Capabilities

### New Capabilities
- `movie-filter-modal`: Comportamiento del modal de filtrado de películas — apertura, cierre y aplicación del filtro al pulsar "Mostrar resultados".

### Modified Capabilities
<!-- No existen specs previos para este componente; no se modifican capabilities existentes. -->

## Impact

- `src/app/shared/components/filter-modal-movies/form-filter/form-filter.ts` — emite un evento de cierre tras `onShowResults()`.
- `src/app/shared/components/filter-modal-movies/filter-modal-movies.html` — enlaza el nuevo evento a `onClose()`.
- Tests: `form-filter.spec.ts` y `filter-modal-movies.spec.ts`.
- Sin cambios en la API de TMDB ni en el contrato de `QueryParamsService`.

## Non-goals

- No se modifica la lógica de filtrado ni los parámetros de búsqueda enviados a TMDB.
- No se cambia el comportamiento del botón "Limpiar" (reset).
- No se rediseña la apertura del modal ni su animación.

## Rollback plan

Revertir el commit asociado. Los cambios están aislados en dos archivos del componente (más sus tests); eliminar el `output` y su enlace en el template restaura el comportamiento previo sin efectos colaterales.
