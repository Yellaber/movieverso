# Spec: CacheService — Caché Centralizada con TTL

## Contexto

`TmdbService`, `DetailService` y `HomeService` replican el mismo patrón de caché con `Map<string, T>`. No hay TTL, no hay forma de invalidar entradas y la lógica no es testeable de forma aislada.

## Objetivo

Crear un `CacheService` genérico, reutilizable y con TTL opcional. Todos los servicios de datos lo inyectarán en lugar de manejar su propio `Map`.

## No-goals

- No implementar persistencia en `localStorage` (eso ya lo hace `UserGeolocationService`).
- No manejar caché entre sesiones o entre tabs.
- No reemplazar el caché de Angular Transfer State para SSR (ese es un tema separado).

## Interfaz pública

```typescript
@Injectable({ providedIn: 'root' })
export class CacheService {
  get<T>(key: string): T | null
  set<T>(key: string, value: T, ttlMs?: number): void
  has(key: string): boolean
  delete(key: string): void
  clear(): void
}
```

## Comportamiento esperado

- `get(key)` retorna `null` si la clave no existe o si el TTL expiró. Al expirar, elimina la entrada.
- `set(key, value)` sin `ttlMs` almacena sin expiración.
- `set(key, value, ttlMs)` almacena con timestamp de expiración = `Date.now() + ttlMs`.
- `has(key)` es equivalente a `get(key) !== null` (respeta TTL).

## Uso en servicios existentes

Reemplazar en `TmdbService`, `DetailService` y `HomeService`:

```typescript
// Antes
if (this.cacheQuery.has(url)) {
  return of(<T>this.cacheQuery.get(url));
}
return this.http.get<T>(url).pipe(
  tap(data => this.cacheQuery.set(url, data))
);

// Después
const cached = this.cacheService.get<T>(url);
if (cached !== null) return of(cached);
return this.http.get<T>(url).pipe(
  tap(data => this.cacheService.set(url, data, 5 * 60 * 1000)) // 5 min TTL
);
```

## TTLs sugeridos por tipo de dato

| Dato | TTL |
|------|-----|
| Géneros de películas | 24 horas |
| Detalle de película | 30 minutos |
| Listas paginadas (popular, trending…) | 5 minutos |
| Keywords, créditos, trailers | 30 minutos |
| Colecciones | 30 minutos |

## Archivo a crear

- `src/app/shared/services/cache-service.ts`
- `src/app/shared/services/cache-service.spec.ts`

## Archivo a actualizar

- `src/app/shared/services/index.ts` — agregar `CacheService` al barrel export
- `TmdbService`, `DetailService`, `HomeService` — inyectar y usar `CacheService`
- Eliminar `private cacheQuery = new Map<...>()` de cada uno

## Tests requeridos

- `get()` retorna `null` cuando la clave no existe
- `get()` retorna el valor cuando existe y no ha expirado
- `get()` retorna `null` y elimina la entrada cuando el TTL expiró
- `set()` sin TTL almacena sin expiración
- `has()` retorna `false` si el TTL expiró
- `delete()` elimina la entrada correctamente
- `clear()` vacía el store

## Requirements

### Requirement: Generic get/set with optional TTL
The `CacheService` SHALL provide a `get<T>(key: string): T | null` method and a `set<T>(key: string, value: T, ttlMs?: number): void` method. When `ttlMs` is omitted the entry SHALL persist indefinitely. When `ttlMs` is provided the entry SHALL expire after that many milliseconds and `get()` SHALL return `null` for expired entries, removing them from the internal store.

#### Scenario: Get returns null for missing key
- **WHEN** `get(key)` is called for a key that was never set
- **THEN** it returns `null`

#### Scenario: Get returns value before TTL expires
- **WHEN** an entry is set with `ttlMs = 5000` and `get(key)` is called within 5000ms
- **THEN** it returns the stored value

#### Scenario: Get returns null and removes entry after TTL expires
- **WHEN** an entry is set with `ttlMs = 5000` and `get(key)` is called after 5000ms have elapsed
- **THEN** it returns `null` and the entry is removed from the internal store

#### Scenario: Set without TTL stores indefinitely
- **WHEN** `set(key, value)` is called without a `ttlMs` argument
- **THEN** `get(key)` continues to return the value regardless of elapsed time

### Requirement: has() respects TTL
The `CacheService` SHALL provide a `has(key: string): boolean` method that returns `true` only if the key exists AND has not expired. It MUST NOT return `true` for an entry whose TTL has elapsed.

#### Scenario: has returns true for valid entry
- **WHEN** `set(key, value, ttlMs)` is called and the TTL has not elapsed
- **THEN** `has(key)` returns `true`

#### Scenario: has returns false for expired entry
- **WHEN** an entry's TTL has elapsed
- **THEN** `has(key)` returns `false`

#### Scenario: has returns false for missing key
- **WHEN** `has(key)` is called for a key that was never set
- **THEN** it returns `false`

### Requirement: delete() removes a single entry
The `CacheService` SHALL provide a `delete(key: string): void` method that removes the entry for the given key. After deletion, `get(key)` SHALL return `null` and `has(key)` SHALL return `false`.

#### Scenario: Delete removes the entry
- **WHEN** `delete(key)` is called for an existing key
- **THEN** `get(key)` returns `null` and `has(key)` returns `false`

#### Scenario: Delete on missing key does nothing
- **WHEN** `delete(key)` is called for a key that does not exist
- **THEN** no error is thrown and the store state is unchanged

### Requirement: clear() empties the entire store
The `CacheService` SHALL provide a `clear(): void` method that removes all entries regardless of their TTL status.

#### Scenario: Clear removes all entries
- **WHEN** multiple entries have been set and `clear()` is called
- **THEN** `get()` returns `null` for all previously set keys

### Requirement: Data services use CacheService instead of internal Maps
`TmdbService`, `DetailService`, and `HomeService` SHALL inject `CacheService` and use it for all HTTP response caching. Each service SHALL remove its internal `Map` field. Cache calls SHALL specify TTLs appropriate to the data type (genre lists: 24h; movie detail/credits/keywords/trailers/collections: 30min; paginated lists: 5min).

#### Scenario: TmdbService cache hit uses CacheService
- **WHEN** `TmdbService` is called with a URL it has already fetched within the TTL
- **THEN** it returns the cached value via `CacheService.get()` without making an HTTP request

#### Scenario: TmdbService cache miss fetches and stores via CacheService
- **WHEN** `TmdbService` is called with a URL not in cache or past TTL
- **THEN** it makes an HTTP request and stores the result via `CacheService.set()` with the correct TTL
