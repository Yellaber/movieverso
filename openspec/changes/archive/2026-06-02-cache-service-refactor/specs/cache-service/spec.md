## ADDED Requirements

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
