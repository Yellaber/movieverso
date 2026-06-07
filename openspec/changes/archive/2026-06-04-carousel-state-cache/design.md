## Context

`CarouselService` es `@Injectable()` sin `providedIn: 'root'`, y está registrado en `providers: [CarouselService]` del componente `Carousel`. Esto crea una instancia independiente por cada carousel — correcto para múltiples carouseles en la misma página — pero implica que el estado (`scrollStep`) se destruye cuando el componente se desmonta.

`CarouselConfig` es la interfaz que agrupa toda la configuración del carousel (título, películas, botones). Ya incluye campos de presentación (`bgButtons`, `carouselTitle`), por lo que agregar `cacheKey` es coherente con el patrón existente.

La cadena de datos es: `SectionMovie` / `MovieList` → `CarouselMovies` → `Carousel` → `CarouselService`.

## Goals / Non-Goals

**Goals:**
- Restaurar la posición de navegación del carousel al volver a una ruta que ya fue visitada en la misma sesión.
- No romper carouseles existentes que no pasen `cacheKey` (campo opcional).
- Mantener el alcance de componente de `CarouselService` (una instancia por carousel).

**Non-Goals:**
- Persistir el estado entre recargas de página (no se usa `localStorage`/`sessionStorage`).
- Cachear carouseles de la página de detalle de película por defecto — el alcance inicial es `SectionMovie` (Home). Queda preparado para extensión.
- Cachear el estado de otras propiedades del carousel (dimensiones, conteo de cards).

## Decisions

### 1. CarouselCacheService independiente vs. reutilizar ScrollService

**Elegido: nuevo `CarouselCacheService` (`providedIn: 'root'`).**

`ScrollService` gestiona posición de scroll de página (pixels de `documentElement`). El estado del carousel es un desplazamiento lógico propio del componente. Mezclarlos viola el principio de responsabilidad única y complicaría las keys (una URL puede tener N carouseles).

### 2. cacheKey en CarouselConfig vs. input independiente en CarouselMovies/Carousel

**Elegido: campo `cacheKey?: string` en `CarouselConfig`.**

`CarouselConfig` ya es el contrato de configuración del carousel. Agregar `cacheKey` sigue el mismo patrón que `bgButtons`. Alternativa (input separado) requeriría cambios en más componentes sin ventaja real.

### 3. Punto de persistencia: OnDestroy de Carousel vs. NavigationStart del router

**Elegido: `OnDestroy` del componente `Carousel`.**

El carousel no tiene visibilidad directa del router, y `OnDestroy` garantiza que la posición se guarda justo antes de que el servicio de instancia se destruya. No se necesita acoplamiento al router.

### 4. Punto de restauración: dentro del effect de inicialización

**Elegido: restaurar el `scrollStep` dentro del mismo `effect()` que llama a `initializer()`, inmediatamente después.**

`initializer()` establece las dimensiones, que son necesarias para calcular `getMax()`. Restaurar en el mismo ciclo del efecto garantiza que el clamping en `setScrollStep()` opera sobre valores válidos.

### 5. setScrollStep con clamping

`CarouselService` expone un nuevo método `setScrollStep(step: number)` que clampea el valor entre `0` y `getMax() - GAP` para evitar posiciones inválidas si las dimensiones cambian entre sesiones (ej. resize de ventana).

### 6. Derivación de cacheKey en SectionMovie

La clave se deriva de `section().heroType` con prefijo `home-`: `home-now-playing`, `home-popular`, `home-top-rated`, `home-trending`. Esto es único dentro de la sesión y estable (no depende de IDs dinámicos).

## Risks / Trade-offs

- **[Riesgo] Desfase dimensiones/step al restaurar**: si el usuario redimensiona la ventana entre visitas, `getMax()` cambia y el paso restaurado puede quedar fuera de rango. → Mitigación: `setScrollStep` clampea el valor; en el peor caso el carousel queda al final.
- **[Riesgo] Múltiples instancias del mismo `cacheKey`**: si por error dos carouseles comparten la misma clave, se sobreescribirán mutuamente en `ngOnDestroy`. → Mitigación: los keys son únicos por diseño (derivados de tipos de sección o IDs de película).
- **[Trade-off] Estado en memoria**: el caché no sobrevive a recarga de página. Es el comportamiento esperado y consistente con `ScrollService`.

## Migration Plan

1. Crear `CarouselCacheService` y exportarlo desde `@services`.
2. Agregar `cacheKey?: string` a `CarouselConfig`.
3. Agregar `setScrollStep()` a `CarouselService`.
4. Modificar `Carousel` component: input `cacheKey`, `OnDestroy`, restore en effect.
5. Modificar `CarouselMovies`: propagar `cacheKey`.
6. Modificar `SectionMovie`: incluir `cacheKey` en `carouselConfig`.
7. Actualizar mocks y tests afectados.

**Rollback**: revertir los archivos modificados. No hay cambios en base de datos ni API externa.

## Open Questions

Sin preguntas abiertas.
