## Why

El componente `Credits` renderiza su host element estilado incluso cuando la API devuelve un `MovieCredit` con `cast` vacío, dejando una caja gris visible sin contenido en la página de detalle de película. El bug afecta cualquier película sin créditos en TMDb.

## What Changes

- `Credits` oculta su host element completo cuando el resource termina de cargar y `cast` está vacío.
- Se agrega un computed signal `shouldShow` que combina el estado de carga con la presencia de integrantes del cast.
- El host binding `[style.display]` controla la visibilidad del componente en función de `shouldShow`.

## Capabilities

### New Capabilities

- `credits-empty-state`: El componente `Credits` gestiona su propia visibilidad en función del estado del resource: se muestra durante la carga (skeleton), se muestra cuando hay cast, y se oculta completamente cuando el cast está vacío.

### Modified Capabilities

(ninguna — no hay specs existentes afectadas)

## Impact

- **Archivo afectado**: `src/app/features/detail-movie/components/credits/credits.ts`
- Sin impacto en APIs, dependencias ni otros componentes.
- El cambio es puramente de presentación y no altera el flujo de datos.
