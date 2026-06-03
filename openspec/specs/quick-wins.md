# Spec: Fix Bugs de Bajo Esfuerzo (Quick Wins)

## Contexto

Conjunto de correcciones menores que se pueden implementar de forma independiente, sin dependencia entre ellas. Cada una tiene impacto concreto con cambio mínimo de código.

---

## Fix 1: `QueryParamsService` — Eliminar mutación de objeto compartido

### Problema

```typescript
constructor() {
  const queryParams = { ...this.queryParams() }; // objeto reutilizado
  this.route.paramMap.subscribe(params => {
    queryParams.primaryReleaseDateGte = ...; // mutación del mismo objeto
    this.queryParams.set(queryParams);       // misma referencia siempre
  });
}
```

Angular Signals compara por referencia. Si el signal ya contiene ese objeto, no se considera cambio.

### Fix

```typescript
constructor() {
  this.route.paramMap.subscribe(params => {
    this.queryParams.set({                  // objeto nuevo en cada emisión
      primaryReleaseDateGte: this.getStringValue(params, 'primaryReleaseDateGte'),
      primaryReleaseDateLte: this.getStringValue(params, 'primaryReleaseDateLte'),
      query:                 this.getStringValue(params, 'query'),
      sortBy:                this.getSortByValue(params),
      voteAverageGte:        this.getNumberValue(params, 'voteAverageGte'),
      voteCountGte:          this.getNumberValue(params, 'voteCountGte'),
      withGenres:            this.getStringValue(params, 'genres'),
    });
  });
}
```

**Archivo:** `src/app/shared/services/query-params-service.ts`

---

## Fix 2: `SeoFriendlyService` — Corregir atributo Open Graph

### Problema

Open Graph requiere `property`, no `name`:

```typescript
// ❌ Incorrecto — los crawlers ignoran estos tags
this.meta.updateTag({ name: 'og:title', content: titlePage });
this.meta.updateTag({ name: 'og:image', content: image });
```

### Fix

```typescript
// ✅ Correcto
this.meta.updateTag({ property: 'og:title', content: titlePage });
this.meta.updateTag({ property: 'og:description', content });
if (image) {
  this.meta.updateTag({ property: 'og:image', content: image });
}
```

También agregar `og:description` que actualmente falta.

**Archivo:** `src/app/shared/services/seo-friendly-service.ts`

**Tests:** Actualizar `seo-friendly-service.spec.ts` — cambiar `name:` por `property:` y agregar aserción para `og:description`.

---

## Fix 3: `PlatformService` — Cachear resultado de `isBrowser()`

### Problema

`isBrowser()` evalúa `typeof window !== 'undefined'` en **cada llamada**. Se invoca en cada evento de scroll y en cada detección de cambio.

### Fix

```typescript
@Injectable({ providedIn: 'root' })
export class PlatformService {
  private readonly _isBrowser: boolean;

  constructor(@Inject(DOCUMENT) document: Document) {
    this._isBrowser = !!document && typeof window !== 'undefined';
  }

  isBrowser(): boolean {
    return this._isBrowser;
  }
}
```

**Archivo:** `src/app/shared/services/platform-service.ts`

**Tests:** Los tests existentes siguen pasando. No se requieren nuevos tests.

---

## Fix 4: `ImageService` spec — `jest.clearAllMocks` sin invocar

### Problema

```typescript
afterEach(() => {
  jest.clearAllMocks; // ❌ no se invoca — falta ()
});
```

Los mocks no se limpian entre tests, lo que puede causar falsos positivos.

### Fix

```typescript
afterEach(() => {
  jest.clearAllMocks(); // ✅
});
```

**Archivo:** `src/app/shared/services/image-service.spec.ts`

---

## Archivos afectados

| Archivo | Tipo de cambio |
|---------|---------------|
| `query-params-service.ts` | Refactor constructor |
| `seo-friendly-service.ts` | Fix atributos meta |
| `seo-friendly-service.spec.ts` | Actualizar assertions |
| `platform-service.ts` | Cachear en constructor |
| `image-service.spec.ts` | Fix typo `clearAllMocks` |
