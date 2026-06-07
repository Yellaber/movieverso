## Context

`Trailer` usa `rxResource` para cargar `Trailer[]` desde TMDb. El template actual tiene tres defectos: (1) el estado de carga activa la rama `@else` mostrando la notificación prematuramente; (2) un array vacío `[]` es truthy en JS por lo que la condición `movieTrailers.value()` pasa, pero `value()[0].key` lanza `TypeError`; (3) `iframe-video.ts` tiene un `@if(videoKey())` sin rama alternativa, dejando el componente vacío si el key es falsy.

## Goals / Non-Goals

**Goals:**
- El estado de carga no muestra ni iframe ni notificación (solo el `carousel-title` queda visible).
- Solo se renderiza `<iframe-video>` cuando `value()` tiene al menos un elemento con `key` no vacío.
- La notificación solo aparece cuando el resource ha resuelto y no hay trailer válido.
- `iframe-video.ts` es un renderizador puro: no valida el key, confía en el padre.

**Non-Goals:**
- No se añade un skeleton de video durante la carga.
- No se oculta el `carousel-title` en ningún estado.
- No se cambia `DetailService` ni el modelo `Trailer`.

## Decisions

**Decisión: validación del key en `trailer.ts`, no en `iframe-video.ts`**

`iframe-video` es un componente presentacional puro. Mezclar lógica de validación dentro de él duplica la responsabilidad: el padre ya decide si renderizarlo. Eliminar el `@if(videoKey())` de `iframe-video.ts` simplifica el componente y centraliza la decisión en `trailer.ts`.

**Template resultante de `trailer.ts`:**

```html
<carousel-title carouselTitle="Trailer"/>
@if(!movieTrailers.isLoading()) {
  @if(movieTrailers.hasValue() && movieTrailers.value()!.length > 0 && movieTrailers.value()![0].key) {
    <iframe-video [videoKey]="movieTrailers.value()![0].key"/>
  } @else {
    <notification .../>
  }
}
```

- `!isLoading()` como guard externo: mientras carga, no se muestra ni iframe ni notificación.
- `value()!.length > 0` evita el crash con array vacío.
- `value()![0].key` truthy-check evita pasar un key vacío al hijo.

**Decisión: `iframe-video.ts` sin `@if`**

Se elimina el `@if(videoKey())` y su sección vacía. La plantilla queda simplemente como el `<section>` con el `<iframe>`, sin condicional interno. El padre garantiza que el componente solo se instancia con un key válido.

## Risks / Trade-offs

- **[Riesgo] Durante la carga, solo el título "Trailer" es visible** → Es un trade-off deliberado: no hay skeleton de video en el proyecto. Es preferible a mostrar la notificación incorrecta. Se puede añadir un skeleton en el futuro como mejora independiente.
- **[Riesgo] La eliminación del `@if` en `iframe-video.ts` asume que el padre siempre pasa un key válido** → Si otro componente en el futuro instancia `<iframe-video>` con key vacío, el iframe apuntará a una URL inválida. Mitigación: el `input.required<string>()` ya documenta que el key es obligatorio; un key vacío sería un bug del caller.
