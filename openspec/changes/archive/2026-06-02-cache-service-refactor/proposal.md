## Why

`TmdbService`, `DetailService`, and `HomeService` each maintain their own `Map<string, T>` for caching HTTP responses, duplicating the same pattern with no TTL support, no invalidation mechanism, and no isolated testability. Centralizing this into a single service eliminates the duplication and adds TTL-based expiration.

## What Changes

- Introduce a new `CacheService` with a generic `get/set/has/delete/clear` API and optional per-entry TTL.
- Remove the `private cacheQuery = new Map<...>()` fields from `TmdbService`, `DetailService`, and `HomeService`.
- Inject `CacheService` into those three services and replace all cache reads/writes with the new API.
- Add `CacheService` to the shared services barrel export (`src/app/shared/services/index.ts`).
- Add a full unit test suite for `CacheService` covering all TTL and lifecycle behaviors.

## Capabilities

### New Capabilities

- `cache-service`: A generic, injectable `CacheService` with optional TTL expiry. Entries older than their TTL are treated as absent and removed on access.

### Modified Capabilities

<!-- No existing spec-level requirements are changing; this is purely an internal implementation refactor of how existing services cache data. -->

## Impact

- **Files created**: `src/app/shared/services/cache-service.ts`, `src/app/shared/services/cache-service.spec.ts`
- **Files modified**: `TmdbService`, `DetailService`, `HomeService` (remove internal Maps, inject `CacheService`), `src/app/shared/services/index.ts`
- **No API or interface changes**: The public behavior of all three data services is unchanged — only the caching mechanism is internalized into `CacheService`.
- **Dependencies**: No new npm packages required.
