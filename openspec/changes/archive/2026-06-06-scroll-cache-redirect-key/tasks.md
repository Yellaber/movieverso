## 1. ScrollService — clave canónica resuelta

- [x] 1.1 En `initScrollTracking()`, eliminar la asignación `this.currentUrl = event.url` del handler de `NavigationStart`, dejando solo `saveScrollPosition(this.currentUrl)` protegido por `isBrowser()`
- [x] 1.2 En el handler de `NavigationEnd`, asignar `this.currentUrl = event.urlAfterRedirects` antes del `setTimeout(0)` que restaura/scrollTop
- [x] 1.3 Verificar que los guardas `isBrowser()` y la lógica `saved ? restoreScrollPosition(...) : scrollTop()` permanecen sin cambios

## 2. Tests unitarios

- [x] 2.1 Actualizar el caso "Should save scroll position and update currentUrl on NavigationStart" para que NavigationStart solo guarde la posición (sin actualizar `currentUrl`)
- [x] 2.2 Actualizar/añadir un caso que verifique que `NavigationEnd` actualiza `currentUrl` desde `event.urlAfterRedirects`
- [x] 2.3 Añadir un caso de simetría de claves ante redirect: tras un `NavigationEnd` con `url !== urlAfterRedirects`, un `NavigationStart` posterior guarda bajo la clave `urlAfterRedirects`
- [x] 2.4 Ejecutar `npx jest scroll-service` y confirmar que toda la suite pasa

## 3. Spec y verificación

- [x] 3.1 Sincronizar el delta de `route-scroll-cache` a `openspec/specs/` (vía archive o sync) tras implementar
- [x] 3.2 Verificar manualmente en el navegador el flujo de redirect (p. ej. teclear una URL inválida que caiga en `**` → `''`, hacer scroll, navegar a un detalle y volver) confirmando que el scroll se restaura correctamente
