## Context

`Credits` usa `rxResource` para cargar créditos de TMDb. La condición `credit.hasValue()` es `true` cuando el resource resuelve con cualquier `MovieCredit` — incluyendo objetos con `cast: []`. El host element tiene clases Tailwind de layout y fondo visibles, por lo que un cast vacío resulta en una caja estilada pero sin contenido en la UI.

## Goals / Non-Goals

**Goals:**
- Ocultar el host element completo de `Credits` cuando el cast está vacío y la carga terminó.
- Mantener el skeleton visible durante la carga independientemente del resultado final.

**Non-Goals:**
- No se modifica `CarouselCredits`, `Carousel`, ni `DetailService`.
- No se añade un estado de "sin créditos" con mensaje — simplemente se oculta.
- No se toca el flujo de datos ni el cache.

## Decisions

**Decisión: host binding `[style.display]` en lugar de `@if` en el padre**

- `@if` en `detail-movie` requeriría pasar estado hacia afuera del componente (output o signal público), acoplando el padre al estado interno del resource.
- Un host binding mantiene la responsabilidad de visibilidad dentro del propio `Credits`, sin cambios en el padre ni en la interfaz pública del componente.
- Alternativa descartada: `[class.hidden]` — añade `visibility: hidden` pero mantiene el espacio en el layout. `display: none` elimina el espacio completamente.

**Implementación concreta:**

```ts
shouldShow = computed(() =>
  this.credit.isLoading() || (this.credit.hasValue() && this.credit.value()!.cast.length > 0)
);
```

Host binding:
```ts
host: {
  class: '...clases-existentes...',
  '[style.display]': 'shouldShow() ? null : "none"'
}
```

`null` como valor de `[style.display]` elimina el atributo inline, dejando que las reglas CSS normales actúen (el host se muestra). `"none"` lo oculta y colapsa su espacio.

## Risks / Trade-offs

- **SEO / SSR**: El componente se ocultará también en el renderizado del servidor para películas sin cast. Esto es correcto — no hay contenido útil que indexar.
- **Tests existentes**: El spec de `Credits` deberá reflejar el nuevo comportamiento del host. Los mocks que devuelvan cast vacío ahora deben afirmar que el host está oculto.
