## ADDED Requirements

### Requirement: CarouselCacheService almacena y recupera posiciones de carousel
El sistema SHALL proporcionar un servicio raíz `CarouselCacheService` con un `Map<string, number>` que permita guardar y recuperar la posición de scroll (`scrollStep`) de cada carousel identificado por una clave única (`cacheKey`).

#### Scenario: Guardar posición de un carousel
- **WHEN** se invoca `savePosition(key, step)` con una clave y un valor numérico
- **THEN** el servicio almacena ese valor en el mapa interno asociado a la clave

#### Scenario: Recuperar posición existente
- **WHEN** se invoca `getPosition(key)` con una clave que tiene valor almacenado
- **THEN** el servicio devuelve el número guardado para esa clave

#### Scenario: Recuperar posición inexistente
- **WHEN** se invoca `getPosition(key)` con una clave sin valor almacenado
- **THEN** el servicio devuelve `undefined`

---

### Requirement: CarouselService expone setScrollStep con clamping
`CarouselService` SHALL exponer un método `setScrollStep(step: number)` que establezca `scrollStep` a un valor clampeado entre `0` y `getMax() - GAP`.

#### Scenario: Restaurar paso válido
- **WHEN** se invoca `setScrollStep` con un valor dentro del rango válido
- **THEN** `scrollStep` toma ese valor exacto

#### Scenario: Restaurar paso superior al máximo
- **WHEN** se invoca `setScrollStep` con un valor mayor que `getMax() - GAP`
- **THEN** `scrollStep` se establece a `getMax() - GAP`

#### Scenario: Restaurar paso negativo
- **WHEN** se invoca `setScrollStep` con un valor negativo
- **THEN** `scrollStep` se establece a `0`

---

### Requirement: Carousel guarda su posición al destruirse
El componente `Carousel` SHALL guardar la posición actual de `CarouselService.getScrollStep()` en `CarouselCacheService` al destruirse (`ngOnDestroy`), siempre que tenga un `cacheKey` configurado.

#### Scenario: Guardar en OnDestroy con cacheKey
- **WHEN** el componente `Carousel` se destruye y tiene un `cacheKey` definido
- **THEN** se invoca `CarouselCacheService.savePosition(cacheKey, scrollStep)`

#### Scenario: No guardar en OnDestroy sin cacheKey
- **WHEN** el componente `Carousel` se destruye y no tiene `cacheKey`
- **THEN** no se invoca `CarouselCacheService.savePosition`

---

### Requirement: Carousel restaura su posición al inicializarse
El componente `Carousel` SHALL restaurar la posición almacenada en `CarouselCacheService` tras llamar a `CarouselService.initializer()`, siempre que tenga `cacheKey` y exista un valor cacheado.

#### Scenario: Restaurar posición al inicializar con caché existente
- **WHEN** el `effect` de `Carousel` invoca `initializer()` y `CarouselCacheService.getPosition(cacheKey)` devuelve un número
- **THEN** se invoca `CarouselService.setScrollStep(cachedStep)`

#### Scenario: No restaurar si no hay caché
- **WHEN** el `effect` de `Carousel` invoca `initializer()` y no hay posición cacheada para el `cacheKey`
- **THEN** no se invoca `CarouselService.setScrollStep`

#### Scenario: No restaurar si no hay cacheKey
- **WHEN** el `effect` de `Carousel` invoca `initializer()` y no hay `cacheKey` definido
- **THEN** no se invoca `CarouselService.setScrollStep`

---

### Requirement: CarouselMovies propaga cacheKey al Carousel interno
`CarouselMovies` SHALL pasar el valor de `carouselConfig().cacheKey` al input `cacheKey` del componente `Carousel` hijo.

#### Scenario: Propagación de cacheKey definido
- **WHEN** `carouselConfig().cacheKey` tiene un valor string
- **THEN** el componente `Carousel` recibe ese string como input `cacheKey`

#### Scenario: Propagación cuando cacheKey es undefined
- **WHEN** `carouselConfig().cacheKey` es `undefined`
- **THEN** el componente `Carousel` recibe `undefined` como input `cacheKey`

---

### Requirement: SectionMovie incluye cacheKey en su carouselConfig
`SectionMovie` SHALL incluir un `cacheKey` derivado de `section().heroType` con el formato `home-{heroType}` en su `carouselConfig` computado.

#### Scenario: cacheKey derivado del heroType
- **WHEN** `section().heroType` es `'now-playing'`
- **THEN** `carouselConfig().cacheKey` es `'home-now-playing'`

#### Scenario: cacheKey distinto por sección
- **WHEN** dos secciones tienen diferente `heroType`
- **THEN** sus `carouselConfig().cacheKey` son valores distintos
