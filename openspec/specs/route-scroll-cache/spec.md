### Requirement: Guardar posición de scroll al abandonar una ruta
El sistema SHALL guardar la posición de scroll actual de la página en el caché interno de `ScrollService` usando la URL de la ruta como clave, justo antes de que comience la navegación a otra ruta.

#### Scenario: Guardar scroll en NavigationStart
- **WHEN** el usuario navega a una ruta diferente y se dispara el evento `NavigationStart`
- **THEN** `ScrollService` guarda la posición de scroll actual asociada a la URL de origen

#### Scenario: No guardar en entorno SSR
- **WHEN** el evento `NavigationStart` se dispara en el servidor (SSR)
- **THEN** `ScrollService` no intenta acceder al DOM ni guardar posición

---

### Requirement: Restaurar posición de scroll al llegar a una ruta visitada
El sistema SHALL restaurar la posición de scroll almacenada para la nueva URL cuando el usuario llega a una ruta que ya fue visitada en la misma sesión.

#### Scenario: Restaurar scroll al volver a una ruta
- **WHEN** el evento `NavigationEnd` se dispara y existe una posición guardada para la nueva URL
- **THEN** `ScrollService` desplaza la página hasta esa posición guardada

#### Scenario: Scroll al inicio en ruta nueva
- **WHEN** el evento `NavigationEnd` se dispara y no existe posición guardada para la nueva URL
- **THEN** `ScrollService` desplaza la página al inicio (`scrollTop = 0`)

#### Scenario: No restaurar en entorno SSR
- **WHEN** el evento `NavigationEnd` se dispara en el servidor (SSR)
- **THEN** `ScrollService` no intenta acceder al DOM ni mover el scroll

---

### Requirement: Inicialización del tracking de scroll
El sistema SHALL inicializar la suscripción a eventos del router una única vez durante el arranque de la aplicación, antes de la primera navegación.

#### Scenario: Inicialización via APP_INITIALIZER
- **WHEN** la aplicación arranca y `provideAppInitializer` invoca `ScrollService.initScrollTracking()`
- **THEN** el servicio queda suscrito a los eventos `NavigationStart` y `NavigationEnd` del router

---

### Requirement: InfiniteScroll no interfiere con la restauración de scroll
El componente `InfiniteScroll` SHALL dejar de llamar a `scrollTop()` en `ngOnInit()`, delegando el control del scroll inicial al `ScrollService`.

#### Scenario: No scroll al inicio en ngOnInit
- **WHEN** el componente `InfiniteScroll` se inicializa
- **THEN** no se invoca `scrollTop()` y el `ScrollService` gestiona la posición mediante los eventos del router
