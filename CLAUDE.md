# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Development
npm start                   # Dev server with auto-open (ng serve -o)
npm test                    # Jest unit tests (single run)
npm run test:watch          # Jest in watch mode
npm run test:coverage       # Coverage report

# Build & Deployment
npm run build               # Full build: generates routes, sets env vars, compiles

# Setup (required before first build)
npm run set:envs            # Creates environment files from .env
npm run prerender:routes    # Fetches TMDb routes and writes routes.txt
```

**Running a single test file:**
```bash
npx jest src/app/shared/services/tmdb-service.spec.ts
npx jest --testPathPattern="tmdb-service"
```

**Environment setup:** Copy `.env.template` to `.env` and fill in these required keys before running the app:
- `API_URL_TMDB`, `API_KEY_TMDB`, `API_URL_IMAGE_TMDB`
- `API_URL_IPGEOLOCATION`, `API_KEY_IPGEOLOCATION`

## Architecture

### Stack
- **Angular 20** — standalone components, signals, `rxResource`, `OnPush` change detection
- **SSR + Prerendering** via `@angular/ssr` / Express; `app.routes.server.ts` controls which routes are prerendered vs. client-rendered
- **Tailwind CSS 4** — utility-only, no component-scoped CSS
- **@ngx-translate/core** — i18n (Spanish default, English fallback), language auto-detected via IPGeolocation API
- **Jest** + `jest-preset-angular` for unit testing

### Path Aliases (tsconfig.json)
| Alias | Resolves to |
|---|---|
| `@app/*` | `src/app/` |
| `@features/*` | `src/app/features/` |
| `@layout/*` | `src/app/layout/` |
| `@components/*` | `src/app/shared/components/` |
| `@interfaces` | `src/app/shared/interfaces/` |
| `@mocks` | `src/app/shared/mocks/` |
| `@services` | `src/app/shared/services/` |
| `@utils` | `src/app/shared/utils/` |
| `@environments/*` | `src/environments/` |

### Feature Structure

All routes are lazy-loaded from `src/app/features/`. Route format for movie detail: `/movie/{id}-{slugified-title}`.

```
features/
├── home/            # 4 hardcoded carousel sections (Now Playing, Popular, Top Rated, Trending)
├── detail-movie/    # Movie detail; child routes: /recommendations, /similar
├── upcoming/        # Category list with infinite scroll + genre filter
├── now-playing/
├── popular/
├── top-rated/
├── trending/
├── search/          # Real-time search results
├── recommendations/
└── similars/
```

### Key Services (`src/app/shared/services/`)

| Service | Role |
|---|---|
| `TmdbService` | All TMDb API calls; in-memory cache (`Map`); reads language/region from `UserGeolocationService` |
| `UserGeolocationService` | Calls IPGeolocation API on app init; caches in localStorage; sets i18n language |
| `HomeService` | Fetches and caches first page of each home section |
| `DetailService` | Movie detail, credits, related movies |
| `SeoFriendlyService` | Sets `<title>`, `og:*`, `twitter:*` meta tags |
| `ScrollService` | Saves/restores scroll position; detects scroll-to-bottom for infinite scroll |
| `PlatformService` | SSR-safe: guards DOM access with `isPlatformBrowser()` |
| `ImageService` | Generates TMDb image URLs with responsive widths |

### Component Patterns

All components are standalone (`standalone: true`, no NgModules) and use `ChangeDetectionStrategy.OnPush`.

**Signals for local state:**
```ts
private idMovie = signal<number | undefined>(undefined);
movieSelected = rxResource({ request: this.idMovie, loader: ({ request }) => ... });
```

**Required inputs use the new input API:**
```ts
carouselConfig = input.required<CarouselConfig>();
```

**Host class binding (layout via Tailwind on host element):**
```ts
@Component({ host: { class: 'flex flex-col gap-5' } })
```

### SSR & Prerendering

- `app.routes.server.ts` marks `/movie/:id-slug/*` as client-rendered; all other routes are prerendered
- `prerender-routes.js` fetches from TMDb and writes `routes.txt` for static generation
- `app.config.ts` configures `provideClientHydration(withEventReplay())` and a custom `IMAGE_LOADER` that prefixes TMDb image URLs with a width parameter

### i18n

Translation files live in `src/i18n/` (Spanish `es`, English `en`). Use the `translate` pipe in templates:
```html
{{ 'home.title' | translate }}
```
Language is set automatically from the user's detected country on app startup via `APP_INITIALIZER`.
