## MODIFIED Requirements

### Requirement: Guardar posición de scroll al abandonar una ruta
El sistema SHALL guardar la posición de scroll actual de la página en el caché interno de `ScrollService` usando como clave la **URL canónica resuelta** (post-redirect) de la ruta de origen, justo antes de que comience la navegación a otra ruta. La clave de guardado SHALL coincidir siempre con la clave de restauración (`urlAfterRedirects`), incluso cuando la navegación atraviesa un redirect.

#### Scenario: Guardar scroll en NavigationStart
- **WHEN** el usuario navega a una ruta diferente y se dispara el evento `NavigationStart`
- **THEN** `ScrollService` guarda la posición de scroll actual asociada a la URL canónica resuelta de la ruta de origen

#### Scenario: Clave consistente ante redirects
- **WHEN** el usuario llega a una ruta a través de un redirect (la URL solicitada difiere de `urlAfterRedirects`) y posteriormente la abandona
- **THEN** `ScrollService` usa la misma URL canónica resuelta como clave tanto al guardar como al restaurar, de modo que la posición de scroll de esa ruta no queda congelada

#### Scenario: No guardar en entorno SSR
- **WHEN** el evento `NavigationStart` se dispara en el servidor (SSR)
- **THEN** `ScrollService` no intenta acceder al DOM ni guardar posición
