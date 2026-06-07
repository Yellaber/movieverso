## Why

El caché de scroll por ruta de `ScrollService` usa **claves distintas para guardar y restaurar** cuando una ruta redirige. Guarda bajo `this.currentUrl`, tomado de `NavigationStart.url` (URL pre-redirect), pero restaura con `NavigationEnd.urlAfterRedirects` (URL post-redirect). Ante cualquier redirect —por ejemplo el wildcard `**` → `''` al teclear una URL inválida— las claves divergen y la posición de scroll de esa ruta queda congelada en el primer valor guardado. El enlace `/home` del logo ya provocó exactamente este síntoma; corregir el enlace resolvió el caso puntual, pero la fragilidad subyacente sigue latente para cualquier otro redirect.

## What Changes

- `ScrollService` pasa a rastrear `currentUrl` desde `event.urlAfterRedirects` en `NavigationEnd`, en lugar de `event.url` en `NavigationStart`.
- Con ello, guardar (en `NavigationStart`) y restaurar (en `NavigationEnd`) usan siempre la misma **clave canónica resuelta**, independientemente de redirects.
- Se actualizan los tests unitarios de `scroll-service.spec.ts` para reflejar el nuevo punto de actualización de `currentUrl`.
- No hay cambios en la API pública del servicio ni en el comportamiento observable en rutas sin redirect.

## Capabilities

### New Capabilities
<!-- Ninguna -->

### Modified Capabilities
- `route-scroll-cache`: el requisito de guardado de scroll cambia para especificar que la clave es la **URL canónica resuelta** (post-redirect), garantizando simetría entre guardado y restauración aun cuando la navegación atraviesa un redirect.

## Impact

- **Código**: `src/app/shared/services/scroll-service.ts` (mover la actualización de `currentUrl` de `NavigationStart` a `NavigationEnd` usando `urlAfterRedirects`).
- **Tests**: `src/app/shared/services/scroll-service.spec.ts` (ajustar los casos de `initScrollTracking()` que hoy verifican la actualización de `currentUrl` en `NavigationStart`).
- **Spec**: `openspec/specs/route-scroll-cache/spec.md` (requisito de guardado).
- **Sin impacto** en SSR (los guardas `isBrowser()` se mantienen), ni en componentes consumidores, ni en el comportamiento de rutas sin redirect.

## Non-goals

- No se modifica el enlace del logo ni ninguna ruta (ya resuelto por separado).
- No se añade persistencia del scroll entre recargas (sigue siendo en memoria por sesión).
- No se cambia el uso de `setTimeout(0)` para el restore ni la lógica de detección de fin de scroll.

## Rollback plan

Cambio aislado y reversible: revertir el commit restaura el rastreo de `currentUrl` en `NavigationStart` y los tests previos. No hay migraciones de datos ni estado persistente, por lo que el rollback es inmediato y sin efectos colaterales.
