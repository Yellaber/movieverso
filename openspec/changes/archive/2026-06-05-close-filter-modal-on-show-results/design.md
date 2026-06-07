## Context

El modal de filtros se compone de dos elementos:

- `FilterModalMovies` (contenedor): posee el estado `show = model.required<boolean>()`, las animaciones de entrada/salida y `onClose()`, que desbloquea el scroll de la ventana y oculta el overlay.
- `FormFilter` (hijo, embebido como `<form-filter/>`): contiene el formulario, la validación y `onShowResults()`, que aplica los `QueryParams` y navega a `/search`.

Hoy `FormFilter` no tiene ninguna referencia ni canal de comunicación hacia su contenedor, por lo que tras mostrar resultados no puede pedir el cierre del modal. El cierre correcto requiere la animación y limpieza que ya viven en `FilterModalMovies.onClose()`.

## Goals / Non-Goals

**Goals:**
- Cerrar el modal automáticamente tras aplicar el filtro y navegar, reutilizando `onClose()` (animación + desbloqueo de scroll + ocultar overlay).
- Mantener el modal abierto cuando el formulario es inválido.

**Non-Goals:**
- Cambiar la lógica de filtrado, los query params o la navegación.
- Modificar el botón "Limpiar" o la apertura del modal.

## Decisions

**Decisión: Comunicación hijo → padre vía `output()`.**
`FormFilter` expone `showResults = output<void>()` (API moderna de Angular, coherente con el uso de signals/`model` en el resto del componente). En `onShowResults()`, tras navegar, emite el evento. El contenedor lo enlaza en el template: `<form-filter (showResults)="onClose()"/>`.

- *Alternativa A — pasar `show` como `model` al hijo y que el hijo lo ponga en `false`:* descartada. Saltaría la animación de salida y la limpieza de `onClose()` (scroll quedaría bloqueado), duplicando responsabilidades.
- *Alternativa B — `ViewChild`/referencia directa al contenedor:* descartada por acoplar el hijo al padre e invertir la dirección natural del flujo de datos en Angular.

**Decisión: Emitir solo en camino válido.**
La emisión se coloca al final de `onShowResults()`. El botón ya está `[disabled]="isInvalid()"`, y `onShowResults()` solo se ejecuta en envío válido, por lo que no se requiere guard adicional; el modal nunca se cerrará con formulario inválido.

## Risks / Trade-offs

- [El botón tiene tanto `(click)="onShowResults()"` como el form `(ngSubmit)="isInvalid()"`] → No se modifica ese cableado; el `output` se emite dentro de `onShowResults()`, que ya es el único punto de aplicación del filtro. Sin doble cierre.
- [`onClose()` usa `setTimeout(300ms)` y la navegación a `/search` ocurre antes] → La navegación y el cierre son independientes; la animación de salida se solapa con el cambio de ruta sin bloquear, comportamiento aceptable y ya usado al cerrar manualmente.
