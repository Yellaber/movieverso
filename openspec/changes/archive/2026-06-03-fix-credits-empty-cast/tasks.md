## 1. Implementación del fix en Credits

- [x] 1.1 Agregar el computed signal `shouldShow` en `credits.ts` que retorna `true` si el resource está cargando O si el cast tiene al menos 1 elemento
- [x] 1.2 Agregar el host binding `[style.display]` en `credits.ts` que asigna `null` cuando `shouldShow()` es `true` y `"none"` cuando es `false`

## 2. Actualización de tests

- [x] 2.1 Actualizar el test existente de `credits.spec.ts` para verificar que el host element es visible cuando el cast tiene integrantes
- [x] 2.2 Agregar test: cuando `getMovieCredits` retorna cast vacío, el host element tiene `display: none`
- [x] 2.3 Agregar test: durante la carga (`isLoading === true`), el host element es visible y se muestra el skeleton
