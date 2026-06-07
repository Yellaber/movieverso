## ADDED Requirements

### Requirement: Trailer no muestra contenido durante la carga
El componente `Trailer` SHALL omitir tanto el iframe como la notificación mientras el resource `movieTrailers` está en estado de carga, mostrando únicamente el título de sección.

#### Scenario: Estado de carga inicial
- **WHEN** el resource `movieTrailers` está en estado `isLoading() === true`
- **THEN** no se renderiza `<iframe-video>` ni `<notification>` en el DOM

### Requirement: Trailer muestra el iframe solo con key válido
El componente `Trailer` SHALL renderizar `<iframe-video>` únicamente cuando el resource ha resuelto con al menos un elemento en el array y el `key` del primer elemento es un string no vacío.

#### Scenario: Trailer con key válido
- **WHEN** el resource resuelve con `Trailer[]` de longitud ≥ 1 y `value()[0].key` es un string no vacío
- **THEN** se renderiza `<iframe-video>` con ese `key` como input

#### Scenario: Array vacío — sin crash
- **WHEN** el resource resuelve con `Trailer[]` de longitud 0
- **THEN** no se produce error de runtime y se renderiza `<notification>` en su lugar

#### Scenario: Key vacío — sin iframe en blanco
- **WHEN** el resource resuelve con un trailer cuyo `key` es string vacío `''`
- **THEN** no se renderiza `<iframe-video>` y se muestra `<notification>` en su lugar

### Requirement: Trailer muestra notificación solo tras carga fallida o sin resultados
El componente `Trailer` SHALL mostrar `<notification>` únicamente cuando el resource ha terminado de cargar y no existe un trailer válido disponible.

#### Scenario: Notificación tras carga sin trailer
- **WHEN** el resource termina de cargar y el array resultante está vacío o el key es inválido
- **THEN** se muestra `<notification>` con el mensaje de "sin trailer disponible"

#### Scenario: Sin notificación prematura durante carga
- **WHEN** el resource está en estado de carga
- **THEN** `<notification>` no está presente en el DOM

### Requirement: IframeVideo renderiza el iframe sin validación interna del key
El componente `IframeVideo` SHALL renderizar el `<iframe>` directamente con la URL construida a partir del `videoKey` recibido, sin guardar condicionales internos sobre el valor del input.

#### Scenario: Iframe renderizado con key provisto
- **WHEN** el componente recibe un `videoKey` no vacío
- **THEN** se renderiza el `<iframe>` con la URL `https://www.youtube.com/embed/{videoKey}`
