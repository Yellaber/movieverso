## 1. Fix de trailer.ts — manejo de estados

- [x] 1.1 Añadir guard `@if(!movieTrailers.isLoading())` como contenedor externo del bloque `@if`/`@else` en el template de `trailer.ts`
- [x] 1.2 Reemplazar la condición del `@if` interno por `movieTrailers.hasValue() && movieTrailers.value()!.length > 0 && movieTrailers.value()![0].key` para evitar el crash con array vacío y el iframe con key vacío

## 2. Fix de iframe-video.ts — eliminar validación interna

- [x] 2.1 Eliminar el `@if(videoKey())` de la plantilla de `iframe-video.ts` y dejar el `<section>` con el `<iframe>` como contenido directo del template

## 3. Actualización de tests de trailer.spec.ts

- [x] 3.1 Agregar verificación en el test existente (movieId válido): durante la carga (pre-tick), `<iframe-video>` y `<notification>` no están en el DOM
- [x] 3.2 Agregar test: `getMovieTrailers` retorna `[]` → `<notification>` se muestra y no hay crash por `undefined[0].key`
- [x] 3.3 Agregar test: `getMovieTrailers` retorna trailer con `key: ''` → `<notification>` se muestra en lugar de `<iframe-video>`

## 4. Actualización de tests de iframe-video.spec.ts

- [x] 4.1 Eliminar o actualizar los tests que verifican que el iframe NO se renderiza con key vacío o `undefined`, ya que ese comportamiento ahora es responsabilidad del padre
- [x] 4.2 Verificar que el test del caso válido (`videoKey = 'gHlm5ZAW67u'`) sigue pasando sin cambios
