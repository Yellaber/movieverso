## 1. ScrollService — integración con Router

- [x] 1.1 Inyectar `Router` en `ScrollService` y agregar el método `initScrollTracking()` que suscribe a `NavigationStart` (guardar scroll de la URL actual) y `NavigationEnd` (restaurar scroll si existe en caché, o `scrollTop()` si no), usando `setTimeout(..., 0)` para el restore y protegiendo con `isBrowser()`

## 2. Inicialización en app.config.ts

- [x] 2.1 Agregar un `provideAppInitializer` en `app.config.ts` que invoque `scrollService.initScrollTracking()`

## 3. InfiniteScroll — eliminar scrollTop manual

- [x] 3.1 Eliminar la llamada a `this.scrollService.scrollTop()` de `InfiniteScroll.ngOnInit()`; actualizar el test correspondiente para que no espere esa llamada

## 4. Tests unitarios de ScrollService

- [x] 4.1 Agregar tests para `initScrollTracking()`: verificar que en `NavigationStart` se llama a `saveScrollPosition` con la URL correcta y que en `NavigationEnd` se llama a `restoreScrollPosition` si hay posición guardada, o a `scrollTop()` si no la hay
