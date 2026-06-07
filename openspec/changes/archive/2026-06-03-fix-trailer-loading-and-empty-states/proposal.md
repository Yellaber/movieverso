## Why

El componente `Trailer` tiene tres bugs relacionados con el manejo de estados: durante la carga muestra la notificación "sin trailer" antes de que llegue la respuesta, un array vacío del API provoca un crash por acceso a `undefined[0].key`, y si el `key` del primer trailer es vacío `iframe-video` no renderiza nada — dejando al usuario con solo el título "Trailer" y sin feedback.

## What Changes

- `trailer.ts` añade un guard explícito para el estado de carga: durante `isLoading()` no se renderiza ni el iframe ni la notificación.
- `trailer.ts` corrige la condición del `@if` para verificar que el array tenga al menos un elemento con un `key` válido antes de renderizar `<iframe-video>`.
- `iframe-video.ts` elimina el guard interno `@if(videoKey())` — la responsabilidad de validar el key se centraliza en el padre.

## Capabilities

### New Capabilities

- `trailer-state-management`: El componente `Trailer` gestiona correctamente sus tres estados — carga, sin trailer disponible, y trailer con key válido — mostrando el contenido apropiado en cada caso sin crashes ni estados intermedios incorrectos.

### Modified Capabilities

(ninguna — no hay specs existentes afectadas)

## Impact

- **Archivos afectados**: `src/app/features/detail-movie/components/trailer/trailer.ts`, `src/app/features/detail-movie/components/trailer/iframe-video/iframe-video.ts`
- Sin impacto en APIs, dependencias ni otros componentes.
