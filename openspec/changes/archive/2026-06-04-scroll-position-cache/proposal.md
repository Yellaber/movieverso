## Why

Al navegar entre rutas (por ejemplo, de una página de lista como `/popular` a un detalle de película y luego volver), el scroll siempre se reinicia al inicio de la página, perdiendo el contexto visual del usuario. El `ScrollService` ya contiene la infraestructura necesaria (`saveScrollPosition`, `restoreScrollPosition`, `cacheScroll`), pero no está conectado a los eventos del router.

## What Changes

- Se conecta `ScrollService` a los eventos del router de Angular para guardar/restaurar el scroll automáticamente al navegar entre rutas.
- En `NavigationStart`: se guarda la posición de scroll de la URL actual antes de abandonarla.
- En `NavigationEnd`: si existe una posición guardada para la nueva URL se restaura; si no, se hace scroll al inicio.
- Se elimina la llamada manual a `scrollTop()` en `InfiniteScroll.ngOnInit()`, delegando ese comportamiento al servicio.
- Se agrega un método `initScrollTracking()` en `ScrollService` que suscribe a los eventos del router.
- Se invoca `initScrollTracking()` desde `app.config.ts` usando `provideAppInitializer`.

## Capabilities

### New Capabilities
- `route-scroll-cache`: Persistencia automática del estado de scroll por ruta durante la sesión del usuario, integrando `ScrollService` con los eventos del router de Angular.

### Modified Capabilities

## Impact

- **`ScrollService`**: Se extiende con inyección de `Router` y lógica de suscripción a eventos de navegación.
- **`InfiniteScroll` component**: Se elimina la llamada a `scrollTop()` de `ngOnInit()`.
- **`app.config.ts`**: Se agrega `provideAppInitializer` para iniciar el scroll tracking.
- **Sin cambios en la API pública del servicio**: los métodos existentes (`saveScrollPosition`, `restoreScrollPosition`) siguen disponibles.
- **Sin dependencias nuevas**: usa únicamente `@angular/router` que ya está presente.
