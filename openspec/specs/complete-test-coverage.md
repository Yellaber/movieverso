# Spec: Completar Cobertura de Tests

## Contexto

Los tests existentes cubren los casos "happy path" de los servicios principales. Sin embargo, hay gaps en edge cases y en servicios que tienen tests muy básicos.

## Objetivo

Completar la cobertura de tests para los servicios con gaps identificados, sin modificar el código de producción.

---

## 1. `QueryParamsService` — Casos adicionales

### Casos faltantes

```typescript
describe('getNumberValue() — valores individuales.', () => {
  it('Should return 7 for voteAverageGte when param is absent.', () => { ... })
  it('Should return 100 for voteCountGte when param is absent.', () => { ... })
  it('Should return 0 for unknown keys.', () => { ... })
  it('Should parse voteAverageGte from params correctly.', () => { ... })
  it('Should parse voteCountGte from params correctly.', () => { ... })
})

describe('getSortByValue() — casos edge.', () => {
  it('Should return "popularity.desc" when sortBy param is empty string.', () => { ... })
  it('Should return "popularity.desc" when sortBy param is absent.', () => { ... })
  it('Should return the provided sortBy value when present.', () => { ... })
})

describe('getStringValue() — casos edge.', () => {
  it('Should return empty string when param is absent.', () => { ... })
  it('Should return the param value when present.', () => { ... })
})
```

---

## 2. `CarouselMoviesService` — Edge cases

### Casos faltantes

```typescript
it('Should not go below 0 on previous() when already at start.', () => {
  carouselMoviesService.initializer(1000, 20);
  carouselMoviesService.previous(); // ya está en 0
  expect(carouselMoviesService['scrollStep']()).toBe(0);
})

it('Should not exceed totalScrollStep on next() when at end.', () => {
  carouselMoviesService.initializer(1000, 20);
  // navegar múltiples veces hasta el final
  for (let i = 0; i < 10; i++) carouselMoviesService.next();
  const stepAtEnd = carouselMoviesService['scrollStep']();
  carouselMoviesService.next(); // intentar avanzar más allá del final
  expect(carouselMoviesService['scrollStep']()).toBe(stepAtEnd);
})

it('getScrollStep() should return the current scrollStep.', () => {
  carouselMoviesService.initializer(1000, 20);
  carouselMoviesService.next();
  expect(carouselMoviesService.getScrollStep()).toBe(carouselMoviesService['scrollStep']());
})
```

---

## 3. `CarouselService` — Edge cases

### Casos faltantes (simétricos a CarouselMoviesService)

```typescript
it('Should not go below 0 on previous() when already at start.', () => { ... })
it('Should not exceed max on next() when at end.', () => { ... })
it('getScrollStep() should return the current scrollStep value.', () => { ... })
```

---

## 4. `SeoFriendlyService` — Caso faltante

### Caso faltante

```typescript
it('Should NOT call updateTag for og:image when no image is provided.', () => {
  jest.spyOn(metaService, 'updateTag');
  seofriendlyService.setMetaTags(titlePage, contentPage); // sin imagen
  const calls = (metaService.updateTag as jest.Mock).mock.calls;
  const ogImageCall = calls.find(call => call[0]?.property === 'og:image');
  expect(ogImageCall).toBeUndefined();
})
```

> Nota: Este test debe actualizarse junto con el Fix 2 del spec `quick-wins.md` (cambio `name` → `property`).

---

## 5. `UserGeolocationService` — Signals computados (tras `centralize-geolocation.md`)

Después de agregar `userLanguage` y `userCountry` como computed signals públicos:

```typescript
describe('userLanguage computed signal.', () => {
  it('Should return the first language when geolocation is set.', () => { ... })
  it('Should return empty string when geolocation is undefined.', () => { ... })
})

describe('userCountry computed signal.', () => {
  it('Should return country_code2 when geolocation is set.', () => { ... })
  it('Should return empty string when geolocation is undefined.', () => { ... })
})
```

---

## Archivos a actualizar

| Archivo | Cambios |
|---------|---------|
| `query-params-service.spec.ts` | Agregar tests de métodos privados con spy |
| `carousel-movies-service.spec.ts` | Agregar edge cases de navegación |
| `carousel-service.spec.ts` | Agregar edge cases de navegación |
| `seo-friendly-service.spec.ts` | Agregar test de ausencia de `og:image` + actualizar `name` → `property` |
| `user-geolocation-service.spec.ts` | Agregar tests de nuevos computed signals (tras spec `centralize-geolocation.md`) |

## Dependencias

- El test de `SeoFriendlyService` (#4) debe implementarse **después** del Fix 2 en `quick-wins.md`.
- El test de `UserGeolocationService` (#5) debe implementarse **después** de `centralize-geolocation.md`.
- El resto son independientes.
