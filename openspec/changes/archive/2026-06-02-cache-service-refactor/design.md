## Context

Three services — `TmdbService`, `DetailService`, and `HomeService` — each hold a `private cacheQuery = new Map<string, T>()` and repeat the same check-then-fetch-then-store pattern. There is no TTL, no shared invalidation, and the cache logic cannot be unit-tested in isolation. The fix is a single `CacheService` that all three inject.

Angular 20 with `providedIn: 'root'` means the service is a singleton per platform context (one instance per server request in SSR, one shared instance in the browser). This matches the existing behavior since each service already had its own per-instance Map.

## Goals / Non-Goals

**Goals:**
- One generic `CacheService` handles all in-memory caching across data services.
- Optional per-entry TTL: entries older than their TTL are silently expired on `get()`.
- Full unit test coverage for `CacheService` with TTL scenarios.
- All three data services migrated; their internal Maps removed.

**Non-Goals:**
- No `localStorage` persistence (already handled exclusively by `UserGeolocationService`).
- No cross-tab or cross-session cache sharing.
- No integration with Angular Transfer State (SSR hydration caching is a separate concern).
- No LRU eviction or max-size limits.

## Decisions

### D1: Lazy expiry on `get()` (not background interval)

**Decision**: Entries are only expired when `get()` or `has()` is called — there is no background timer clearing stale entries.

**Rationale**: Simpler implementation, no memory leaks from dangling intervals, and SSR-safe (no timers surviving between requests). Stale entries that are never re-requested consume negligible memory.

**Alternative considered**: `setInterval` sweep — rejected because it requires teardown logic (`OnDestroy`), breaks SSR request isolation, and adds complexity for minimal benefit.

### D2: TTL stored as absolute expiry timestamp

**Decision**: `set(key, value, ttlMs)` stores `expiresAt = Date.now() + ttlMs`. On `get()`, compare `Date.now() >= expiresAt`.

**Rationale**: Straightforward to reason about and easy to mock in tests by spying on `Date.now`.

**Alternative considered**: Storing creation time + TTL — equivalent, but requires two values per entry instead of one.

### D3: `has(key)` respects TTL via `get()`

**Decision**: `has(key)` is implemented as `this.get(key) !== null`, not as `this.store.has(key)`.

**Rationale**: Ensures consistent TTL semantics — a caller checking `has()` before `get()` sees the same expiry window. A direct `Map.has()` would return `true` for expired entries.

### D4: No TTL means permanent (no expiry field set)

**Decision**: Entries set without `ttlMs` have `expiresAt = undefined`, which is treated as "never expires".

**Rationale**: Matches current behavior of the raw `Map` usage in existing services. Provides an easy migration path — callers can add TTL later without changing the API.

### D5: TTLs per data type

Adopt the suggested TTLs from the spec as defaults for each service:

| Data type | TTL |
|---|---|
| Genre lists | 24 hours |
| Movie detail, keywords, credits, trailers, collections | 30 minutes |
| Paginated lists (popular, trending, now-playing, etc.) | 5 minutes |

## Risks / Trade-offs

- **SSR singleton isolation**: `providedIn: 'root'` creates one `CacheService` per server request (Angular SSR creates a fresh injector per request). This is correct behavior — no risk of request bleeding.
- **Clock drift in tests**: Tests that advance time must spy on `Date.now`. The `jest.spyOn(Date, 'now')` pattern is standard and works with jest-preset-angular.
- **Memory growth**: Without a max-size limit, a long-lived browser session could accumulate many stale entries that are never re-requested. Acceptable for this app's scale; revisit if profiling shows issues.

## Migration Plan

1. Create `CacheService` + tests (no service changes yet).
2. Migrate `TmdbService` — inject `CacheService`, remove `cacheQuery` Map, update all cache calls with appropriate TTLs.
3. Migrate `DetailService` — same pattern.
4. Migrate `HomeService` — same pattern.
5. Update barrel export (`src/app/shared/services/index.ts`).
6. Run full test suite; verify no regressions.
7. No rollback complexity — this is a pure internal refactor with no external API changes.
