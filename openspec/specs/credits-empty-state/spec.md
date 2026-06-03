### Requirement: Credits se oculta cuando el cast está vacío
El componente `Credits` SHALL ocultarse completamente (sin ocupar espacio en el layout) cuando el resource termina de cargar y la lista `cast` del `MovieCredit` retornado está vacía.

#### Scenario: Cast vacío tras carga exitosa
- **WHEN** el resource `credit` completa su carga con un `MovieCredit` cuyo `cast` tiene longitud 0
- **THEN** el host element de `Credits` tiene `display: none` y no ocupa espacio en la página

#### Scenario: Cast con integrantes — componente visible
- **WHEN** el resource `credit` completa su carga con un `MovieCredit` cuyo `cast` tiene al menos 1 elemento
- **THEN** el host element de `Credits` es visible y renderiza el `<carousel-credits>`

#### Scenario: Durante la carga — skeleton visible
- **WHEN** el resource `credit` está en estado `isLoading() === true`
- **THEN** el host element de `Credits` es visible y renderiza el `<carousel-credit-skeleton>`

#### Scenario: Error del resource
- **WHEN** el resource `credit` falla (error de red u otro)
- **THEN** el host element de `Credits` se oculta (no hay cast que mostrar)
