## 1. Implementación

- [x] 1.1 En `form-filter.ts`, declarar `showResults = output<void>()` (importar `output` de `@angular/core`).
- [x] 1.2 En `form-filter.ts`, emitir `this.showResults.emit()` al final de `onShowResults()`, tras la navegación.
- [x] 1.3 En `filter-modal-movies.html`, enlazar el evento: `<form-filter (showResults)="onClose()"/>`.

## 2. Pruebas

- [x] 2.1 En `form-filter.spec.ts`, verificar que `onShowResults()` emite `showResults` con formulario válido.
- [x] 2.2 En `filter-modal-movies.spec.ts`, verificar que al emitir `showResults` desde `form-filter` se invoca `onClose()` y el modal se cierra.

## 3. Verificación

- [x] 3.1 Ejecutar `npm test` y confirmar que la suite pasa.
- [x] 3.2 Verificación manual: abrir el modal, aplicar un filtro válido y comprobar que se cierra y muestra resultados; con formulario inválido el modal permanece abierto.
