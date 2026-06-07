## Why

Al navegar fuera de una página que contiene carouseles (ej. Home) y luego regresar, cada carousel se reinicia a la posición 0, porque `CarouselService` tiene alcance de componente y se destruye junto con él. El usuario pierde el contexto de navegación dentro del carousel.

## What Changes

- Se crea `CarouselCacheService` (providedIn: 'root') con un `Map<string, number>` para persistir la posición de scroll de cada carousel durante la sesión.
- Se agrega el campo opcional `cacheKey?: string` a la interfaz `CarouselConfig`, como identificador único del carousel para el caché.
- Se agrega el método `setScrollStep(step: number)` a `CarouselService` para restaurar una posición almacenada, con clamping a los límites válidos.
- `Carousel` component: acepta input opcional `cacheKey`; al destruirse guarda el `scrollStep` en caché; al inicializarse restaura la posición si existe en caché.
- `CarouselMovies` component: propaga `carouselConfig().cacheKey` al `Carousel` via el nuevo input.
- `SectionMovie` component (Home): incluye `cacheKey` derivado de `section().heroType` en su `carouselConfig`.

## Capabilities

### New Capabilities
- `carousel-state-cache`: Persistencia de la posición de navegación de cada carousel durante la sesión, usando una clave única por instancia.

### Modified Capabilities

## Impact

- **`CarouselConfig` interface**: Se extiende con `cacheKey?: string` (no breaking — campo opcional).
- **`CarouselService`**: Nuevo método `setScrollStep(step)`.
- **`Carousel` component**: Nuevo input `cacheKey`, implementa `OnDestroy`, inyecta `CarouselCacheService`.
- **`CarouselMovies` component**: Propaga `cacheKey` desde `carouselConfig()`.
- **`SectionMovie` component**: Calcula y pasa `cacheKey` al `carouselConfig`.
- **`CarouselCacheService`**: Nuevo servicio raíz, exportado desde `@services`.
- **Tests**: `carousel-service.spec`, `carousel.spec`, `carousel-movies.spec`, mocks de `CarouselConfig`.
