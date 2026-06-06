## ADDED Requirements

### Requirement: Aislamiento de caché entre carrusel de detalle y listado paginado

El sistema SHALL cachear los datos de películas relacionadas (`recommendations`, `similar`) bajo claves independientes según su consumidor: la primera página que alimenta el carrusel del detalle (`DetailService.getRelatedMovies`) y el array acumulado de páginas que alimenta el listado "Ver todas" con scroll infinito (`TmdbService.getPaginatedMovies`) MUST NOT compartir la misma entrada de caché, aun cuando correspondan al mismo endpoint TMDb `…/movie/{movieId}/{relation}`.

#### Scenario: El listado paginado no es corrompido por el carrusel del detalle
- **GIVEN** que el carrusel del detalle ya cacheó la primera página como objeto `PaginatedMovies` bajo la URL base
- **WHEN** el usuario abre "Ver todas" y se solicita la primera página vía `getPaginatedMovies`
- **THEN** el sistema SHALL leer/escribir una entrada de caché distinta (array `PaginatedMovies[]`)
- **AND** el listado SHALL mostrar las películas sin lanzar errores de iteración

#### Scenario: El carrusel del detalle no es corrompido por el listado paginado
- **GIVEN** que el listado "Ver todas" ya cacheó un array `PaginatedMovies[]`
- **WHEN** el usuario vuelve al detalle y `getRelatedMovies` solicita las relacionadas
- **THEN** el sistema SHALL obtener un objeto `PaginatedMovies` válido desde su propia entrada
- **AND** el carrusel SHALL renderizarse con sus películas (no una notificación vacía)

#### Scenario: Idempotencia de claves dentro de cada consumidor
- **WHEN** un mismo consumidor solicita repetidamente el mismo `movieId` y `relation`
- **THEN** el sistema SHALL reutilizar su entrada de caché correspondiente respetando el TTL vigente
- **AND** no SHALL crear entradas adicionales por consumidor para los mismos parámetros

### Requirement: Consumo correcto de la forma cacheada

Cada método consumidor SHALL leer exclusivamente la forma de dato que él mismo escribe: `getRelatedMovies` opera sobre un objeto `PaginatedMovies` y `getPaginatedMovies` sobre un array `PaginatedMovies[]`. El sistema MUST NOT realizar operaciones de array (p. ej. *spread*/`flatMap`) sobre un valor de objeto ni desestructurar campos de página sobre un valor de array.

#### Scenario: Acumulación de páginas en scroll infinito
- **GIVEN** una entrada paginada con N páginas cacheadas
- **WHEN** se solicita la página N+1
- **THEN** el sistema SHALL anexar la nueva respuesta al array existente
- **AND** SHALL devolver el array acumulado sin errores de iteración
