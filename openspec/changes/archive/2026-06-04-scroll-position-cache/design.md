## Context

`ScrollService` ya existe con `cacheScroll: Map<string, number>`, `saveScrollPosition(key)` y `restoreScrollPosition(key)` implementados y cubiertos por tests. Sin embargo, ningún componente los invoca en el contexto de navegación entre rutas; el único comportamiento actual es `scrollTop()` al entrar en cada página (llamado desde `InfiniteScroll.ngOnInit()`, `DetailMovie.ngOnInit()`, `Search`).

El resultado es que al regresar a una página de lista (ej. `/popular`), el usuario pierde su posición de scroll y debe volver a bajar para encontrar la película que estaba viendo.

## Goals / Non-Goals

**Goals:**
- Guardar automáticamente la posición de scroll al abandonar una ruta.
- Restaurar automáticamente la posición de scroll al volver a una ruta ya visitada.
- Reutilizar `ScrollService` y su caché en memoria existente.
- No requerir ningún cambio en los componentes de páginas de categoría (`popular`, `top-rated`, etc.).

**Non-Goals:**
- Persistencia entre sesiones (localStorage/sessionStorage): el caché es en memoria, se limpia al recargar la página.
- Restaurar el estado de datos (páginas cargadas por infinite scroll): solo se restaura la posición de scroll; el contenido se recarga normalmente.
- Soporte para rutas con `queryParams` distintos como claves independientes (se usa solo `url.split('?')[0]`).

## Decisions

### 1. Router events vs RouteReuseStrategy vs llamadas manuales

**Elegido: suscripción a eventos del Router (`NavigationStart` / `NavigationEnd`) dentro del `ScrollService`.**

- `NavigationStart` → guardar scroll de la URL actual antes de navegar.
- `NavigationEnd` → restaurar scroll si existe en caché, o hacer `scrollTop()` si no.

*Alternativas descartadas:*
- **RouteReuseStrategy**: Requiere cachear el árbol de componentes completo. Más potente pero mucho más complejo; no es necesario para este caso.
- **Llamadas manuales en cada componente**: Ya existe este patrón y no está siendo usado. Centralizar en el servicio elimina acoplamiento y garantiza cobertura de todas las rutas.

### 2. Punto de inicialización

**Elegido: `provideAppInitializer` en `app.config.ts`.**

Llama a un nuevo método `initScrollTracking()` que suscribe al Router. Esto asegura que el tracking esté activo antes de la primera navegación, sin depender del ciclo de vida de ningún componente.

### 3. Timing de la restauración

**Elegido: `setTimeout(..., 0)` (macrotask) dentro de `NavigationEnd`.**

Angular renderiza el nuevo componente después de que `NavigationEnd` se dispara. Un `setTimeout` de 0 ms empuja la restauración al siguiente ciclo del event loop, garantizando que el DOM esté disponible. No se usa `requestAnimationFrame` para mantener compatibilidad SSR simple (se sigue usando `PlatformService.isBrowser()`).

### 4. Clave de caché

**Elegido: `event.url` tal como lo reporta el Router (incluye query params cuando aplica).**

Para la mayoría de rutas de lista (`/popular`, `/top-rated`) la URL es limpia. Para `/search?query=...` el query param forma parte de la clave, lo que es correcto (cada búsqueda diferente tiene su propio scroll state).

### 5. Modificación de `InfiniteScroll`

Se elimina `this.scrollService.scrollTop()` de `ngOnInit()` en `InfiniteScroll`. El `ScrollService` pasará a ser el responsable del scroll en `NavigationEnd`. Para rutas nuevas sin posición guardada, el servicio hará `scrollTop()` de todas formas, preservando el comportamiento actual.

## Risks / Trade-offs

- **[Riesgo] Desfase entre scroll restaurado e ítems cargados**: al volver a una página con infinite scroll, se muestran los ítems de la página 1 mientras el scroll se posiciona en 1500px. El usuario podría ver un área vacía por un instante hasta que la lista se recargue.
  → *Mitigación*: es un trade-off aceptado. El caché de datos está fuera del alcance de este cambio. La UX mejora respecto al estado actual (sin restauración).

- **[Riesgo] SSR**: `NavigationEnd` en el servidor no genera DOM scroll. `PlatformService.isBrowser()` ya protege todas las operaciones de scroll del servicio; no es necesario un cambio adicional.

- **[Riesgo] Rutas con `NavigationStart` antes de que el componente anterior haya terminado de renderizar**: el scroll guardado podría ser 0 si se navegó rápidamente. Es un edge case menor; el peor caso es no restaurar posición (comportamiento idéntico al actual).

## Migration Plan

1. Agregar `initScrollTracking()` a `ScrollService` (suscribe a Router events).
2. Registrar `initScrollTracking()` via `provideAppInitializer` en `app.config.ts`.
3. Eliminar `this.scrollService.scrollTop()` de `InfiniteScroll.ngOnInit()`.
4. Actualizar el spec de `InfiniteScroll` para reflejar que ya no llama a `scrollTop` en init.
5. Agregar tests unitarios para `initScrollTracking()` en `scroll-service.spec.ts`.

**Rollback**: revertir los 3 archivos modificados. No hay cambios en base de datos ni API.

## Open Questions

Sin preguntas abiertas. Decisión confirmada: `DetailMovie` conserva su llamada explícita a `scrollTop()` porque siempre es una ruta nueva donde el comportamiento esperado es ir al inicio. El servicio también haría `scrollTop()` al no encontrar posición guardada, pero la llamada explícita deja la intención clara y es inofensiva.
