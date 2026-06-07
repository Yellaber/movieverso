## Context

`ScrollService.initScrollTracking()` suscribe a dos eventos del router:

- `NavigationStart`: guarda el scroll de la página que se abandona con `saveScrollPosition(this.currentUrl)` y luego hace `this.currentUrl = event.url`.
- `NavigationEnd`: tras `setTimeout(0)`, restaura con `cacheScroll.get(event.urlAfterRedirects)` o hace `scrollTop()`.

El defecto está en la fuente de la clave: el guardado usa `currentUrl`, que se setea desde `event.url` (URL **pre-redirect**), mientras que la restauración usa `event.urlAfterRedirects` (URL **post-redirect**). En navegaciones sin redirect ambos coinciden, pero cuando interviene un redirect (wildcard `**`, rutas con barra final, futuros `redirectTo`) las claves divergen: el scroll de la ruta de destino se guarda bajo una clave que nunca se vuelve a leer, dejándolo congelado.

El wildcard `** → ''` existe hoy en `app-routes.ts`, así que cualquier URL inválida tecleada reproduce el problema.

## Goals / Non-Goals

**Goals:**
- Garantizar que guardar y restaurar el scroll usen siempre la misma clave canónica resuelta (post-redirect), de forma robusta ante cualquier redirect.
- Mantener intactos el comportamiento en rutas sin redirect, los guardas SSR (`isBrowser()`) y la API pública del servicio.

**Non-Goals:**
- No tocar rutas ni enlaces de la aplicación.
- No introducir persistencia entre recargas ni cambiar el mecanismo `setTimeout(0)` del restore.

## Decisions

**Decisión: rastrear `currentUrl` desde `event.urlAfterRedirects` en `NavigationEnd`, no desde `event.url` en `NavigationStart`.**

El único valor que el router garantiza como URL final y canónica de una ruta es `urlAfterRedirects`, y solo está disponible en `NavigationEnd`. Al mover ahí la actualización de `currentUrl`, este pasa a contener siempre la clave resuelta de la página actualmente visible. Cuando luego se dispara `NavigationStart` al abandonarla, `saveScrollPosition(this.currentUrl)` guarda bajo esa misma clave canónica que la restauración leerá con `urlAfterRedirects`. Las claves quedan simétricas por construcción.

Flujo resultante:
- `NavigationStart`: `saveScrollPosition(this.currentUrl)` — `currentUrl` ya es la clave resuelta de la página que se abandona.
- `NavigationEnd`: `this.currentUrl = event.urlAfterRedirects`; luego `setTimeout(0)` para restaurar/scrollTop según `cacheScroll.get(event.urlAfterRedirects)`.

**Alternativa descartada: resolver el redirect en `NavigationStart`.** En `NavigationStart` el router aún no conoce `urlAfterRedirects`; replicar la resolución de rutas manualmente sería frágil y duplicaría lógica del router.

**Alternativa descartada: corregir solo el enlace `/home`.** Resuelve el síntoma puntual (ya hecho) pero deja la fragilidad ante cualquier otro redirect.

## Risks / Trade-offs

- **[Riesgo] La primera navegación inicializa `currentUrl` en `NavigationEnd` en vez de en `NavigationStart`.** → El guardado solo ocurre al abandonar una ruta tras al menos un `NavigationEnd`, que siempre precede a la primera salida; no hay regresión. El valor inicial de `currentUrl` (`''`) deja de usarse como clave.
- **[Riesgo] Tests existentes asumen actualización de `currentUrl` en `NavigationStart`.** → Se actualizan los casos de `initScrollTracking()` en `scroll-service.spec.ts` para verificar la actualización en `NavigationEnd` con `urlAfterRedirects` y la simetría de claves ante redirect.

## Migration Plan

Cambio aislado en un único servicio. Despliegue directo; rollback inmediato revirtiendo el commit, sin estado persistente ni migraciones.
