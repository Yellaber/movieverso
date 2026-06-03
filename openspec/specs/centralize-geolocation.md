# Spec: Geolocalización Centralizada en UserGeolocationService

## Contexto

`TmdbService`, `HomeService` y `DetailService` replican el mismo par de `computed<string>` para obtener `userLanguage` y `userCountry` a partir de `UserGeolocationService`. Son ~10 líneas de código idénticas en cada uno.

## Objetivo

Exponer `userLanguage` y `userCountry` como señales computadas públicas de `UserGeolocationService`, eliminando la duplicación en los servicios consumidores.

## No-goals

- No cambiar la lógica de detección de idioma (la regla `es → es-XX`, resto `en-US` se mantiene).
- No alterar cómo `UserGeolocationService` obtiene la geolocalización.

## Cambios en `UserGeolocationService`

Agregar dos computed signals públicos:

```typescript
readonly userLanguage = computed<string>(() =>
  this.geolocation()?.country_metadata.languages[0] ?? ''
);

readonly userCountry = computed<string>(() =>
  this.geolocation()?.location.country_code2 ?? ''
);
```

## Cambios en servicios consumidores

Eliminar de `TmdbService`, `HomeService` y `DetailService`:

```typescript
// ELIMINAR estos bloques repetidos:
private userGeolocation = this.userGeolocationService.getUserGeolocation;
private userLanguage = computed<string>(() => { ... });
private userCountry = computed<string>(() => { ... }); // donde aplica
```

Reemplazar por acceso directo al servicio:

```typescript
// En constructores / métodos:
language: this.userGeolocationService.userLanguage(),
region: this.userGeolocationService.userCountry(),
```

## Archivos a actualizar

- `src/app/shared/services/user-geolocation-service.ts` — agregar `userLanguage` y `userCountry`
- `src/app/shared/services/tmdb-service.ts` — usar `userGeolocationService.userLanguage/userCountry`
- `src/app/shared/services/home-service.ts` — ídem
- `src/app/shared/services/detail-service.ts` — usar `userGeolocationService.userLanguage`

## Impacto en tests

- `user-geolocation-service.spec.ts`: agregar tests para `userLanguage` y `userCountry` computados (con geolocalización presente y con `undefined`)
- El resto de specs no requieren cambios porque mockan `UserGeolocationService` completo con `MockUserGeolocationService`
