## 1. CarouselCacheService

- [x] 1.1 Crear `src/app/shared/services/carousel-cache-service.ts` con `providedIn: 'root'`, `Map<string, number>`, y los métodos `savePosition(key, step)` y `getPosition(key)`
- [x] 1.2 Exportar `CarouselCacheService` desde `src/app/shared/services/index.ts`
- [x] 1.3 Crear `src/app/shared/services/carousel-cache-service.spec.ts` con tests de `savePosition` y `getPosition`

## 2. CarouselService — setScrollStep

- [x] 2.1 Agregar el método `setScrollStep(step: number)` a `CarouselService` con clamping entre `0` y `getMax() - GAP`
- [x] 2.2 Agregar tests para `setScrollStep` en `carousel-service.spec.ts`: paso válido, paso mayor al máximo, paso negativo

## 3. CarouselConfig — cacheKey

- [x] 3.1 Agregar campo opcional `cacheKey?: string` a la interfaz `CarouselConfig` en `src/app/shared/interfaces/carousel-config.ts`

## 4. Carousel component — guardar y restaurar

- [x] 4.1 Agregar input opcional `cacheKey` a `Carousel`, inyectar `CarouselCacheService`, implementar `OnDestroy` para guardar la posición si `cacheKey` está definido
- [x] 4.2 En el `effect()` de `Carousel`, tras llamar a `initializer()`, restaurar el `scrollStep` desde caché si `cacheKey` y la posición existen
- [x] 4.3 Actualizar `carousel.spec.ts`: tests para guardar en `OnDestroy` con/sin `cacheKey`, y restaurar en el effect con/sin caché

## 5. CarouselMovies — propagación de cacheKey

- [x] 5.1 Pasar `carouselConfig().cacheKey` al input `cacheKey` del `<carousel>` en la template de `CarouselMovies`
- [x] 5.2 Actualizar `carousel-movies.spec.ts` para verificar la propagación del `cacheKey`

## 6. SectionMovie — derivar cacheKey

- [x] 6.1 Incluir `cacheKey: \`home-${this.section().heroType}\`` en el `carouselConfig` computado de `SectionMovie`
- [x] 6.2 Actualizar `section-movie.spec.ts` para verificar que `carouselConfig().cacheKey` tiene el formato `home-{heroType}`

## 7. Mocks

- [x] 7.1 Actualizar `MockCarouselConfig` en `src/app/shared/mocks/mock-carousel-config.ts` para incluir `cacheKey: 'mock-carousel'`
- [x] 7.2 Agregar `MockCarouselCacheService` a los mocks compartidos con `savePosition` y `getPosition` como `jest.fn()`
