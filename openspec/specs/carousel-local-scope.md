# Spec: CarouselService — Scope Local por Componente

## Contexto

`CarouselService` y `CarouselMoviesService` están declarados con `providedIn: 'root'`, lo que los convierte en singletons globales. Ambos contienen estado interno (`scrollStep`, `totalCards`, `carouselContainerWidth`, etc.).

Si una página renderiza más de un carrusel simultáneamente (ej. la home con 4 secciones `<section-movie>`, cada una con su carrusel), todos comparten el mismo estado. El último en llamar `initializer()` sobreescribe al resto, rompiendo la navegación de los carruseles anteriores.

## Objetivo

Cambiar el scope de `CarouselService` y `CarouselMoviesService` de `root` a **provider local** en el componente que lo usa, para que cada instancia de carrusel tenga su propio estado aislado.

## No-goals

- No cambiar la API pública de ninguno de los dos servicios.
- No afectar la lógica de navegación (next/previous, isPrevious/isNext).

## Cambio en los servicios

Eliminar `providedIn: 'root'` del decorator:

```typescript
// Antes
@Injectable({ providedIn: 'root' })
export class CarouselService { ... }

// Después
@Injectable()
export class CarouselService { ... }
```

Lo mismo para `CarouselMoviesService`.

## Cambio en los componentes

El servicio debe proveerse en el componente carrusel que lo consuma:

```typescript
@Component({
  selector: 'carousel-movies',
  providers: [CarouselMoviesService], // instancia local por cada <carousel-movies>
  ...
})
export class CarouselMovies { ... }

@Component({
  selector: 'carousel',
  providers: [CarouselService], // instancia local por cada <carousel>
  ...
})
export class Carousel { ... }
```

## Identificar componentes afectados

Buscar todos los componentes que inyectan `CarouselService` o `CarouselMoviesService` y verificar que el provider local esté declarado en el `@Component` correcto (el que "posee" el estado del carrusel, no en hijos que solo consumen).

## Archivos a actualizar

- `src/app/shared/services/carousel-service.ts` — eliminar `providedIn: 'root'`
- `src/app/shared/services/carousel-movies-service.ts` — eliminar `providedIn: 'root'`
- Componente(s) carrusel que usan `CarouselService` — agregar `providers: [CarouselService]`
- Componente(s) carrusel que usan `CarouselMoviesService` — agregar `providers: [CarouselMoviesService]`

## Impacto en tests

Los specs actuales de `CarouselService` y `CarouselMoviesService` usan `TestBed.configureTestingModule({ providers: [CarouselService] })`, lo que ya crea una instancia local. **No requieren cambios**.

## Verificación manual

Navegar a la página Home y verificar que los 4 carruseles (Now Playing, Popular, Top Rated, Trending) funcionan independientemente — navegar al siguiente en uno no debe afectar la posición de los otros.
