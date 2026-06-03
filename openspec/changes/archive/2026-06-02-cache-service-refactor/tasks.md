## 1. CacheService Implementation

- [x] 1.1 Create `src/app/shared/services/cache-service.ts` with the `CacheEntry<T>` internal type and `CacheService` class (`providedIn: 'root'`) implementing `get`, `set`, `has`, `delete`, `clear`
- [x] 1.2 Implement TTL logic: `set()` stores `{ value, expiresAt }` where `expiresAt = Date.now() + ttlMs` (or `undefined` when no TTL); `get()` checks `Date.now() >= expiresAt` and deletes expired entries before returning `null`
- [x] 1.3 Implement `has()` as `this.get(key) !== null` to ensure TTL semantics are consistent

## 2. CacheService Unit Tests

- [x] 2.1 Create `src/app/shared/services/cache-service.spec.ts` with a TestBed suite
- [x] 2.2 Test: `get()` returns `null` for a missing key
- [x] 2.3 Test: `get()` returns the value when set without TTL
- [x] 2.4 Test: `get()` returns the value before TTL expires (spy `Date.now`)
- [x] 2.5 Test: `get()` returns `null` and removes entry after TTL expires (spy `Date.now`)
- [x] 2.6 Test: `has()` returns `true` for a valid (non-expired) entry
- [x] 2.7 Test: `has()` returns `false` for an expired entry
- [x] 2.8 Test: `has()` returns `false` for a missing key
- [x] 2.9 Test: `delete()` removes an existing entry
- [x] 2.10 Test: `delete()` on a missing key throws no error
- [x] 2.11 Test: `clear()` removes all entries

## 3. Barrel Export

- [x] 3.1 Add `export * from './cache-service'` to `src/app/shared/services/index.ts`

## 4. Migrate TmdbService

- [x] 4.1 Inject `CacheService` into `TmdbService`; remove `private cacheQuery = new Map<...>()`
- [x] 4.2 Replace all cache reads (`cacheQuery.has` / `cacheQuery.get`) with `cacheService.get()`
- [x] 4.3 Replace all cache writes (`cacheQuery.set`) with `cacheService.set()` using appropriate TTLs (genre lists: 24h = `86_400_000`ms; paginated lists: 5min = `300_000`ms; other: 30min = `1_800_000`ms)

## 5. Migrate DetailService

- [x] 5.1 Inject `CacheService` into `DetailService`; remove its internal `Map`
- [x] 5.2 Replace cache reads/writes with `CacheService` calls (TTL: 30min for detail, credits, trailers, keywords, collections)

## 6. Migrate HomeService

- [x] 6.1 Inject `CacheService` into `HomeService`; remove its internal `Map`
- [x] 6.2 Replace cache reads/writes with `CacheService` calls (TTL: 5min for paginated list sections)

## 7. Verification

- [x] 7.1 Run `npm test` — all existing tests pass, new `CacheService` tests pass
- [x] 7.2 Run `npm start` and verify home page, movie detail, and search work correctly in the browser
