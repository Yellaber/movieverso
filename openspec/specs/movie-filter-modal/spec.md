### Requirement: Cerrar el modal al mostrar resultados

Cuando el usuario pulsa "Mostrar resultados" con el formulario de filtros válido, el sistema SHALL aplicar el filtro, navegar a la página de resultados y cerrar el modal de filtros, ejecutando la misma rutina de cierre que el botón de cerrar (animación de salida, desbloqueo del scroll de la ventana y ocultación del overlay).

#### Scenario: Mostrar resultados con formulario válido cierra el modal
- **GIVEN** el modal de filtros está abierto y el formulario es válido
- **WHEN** el usuario pulsa "Mostrar resultados"
- **THEN** el sistema aplica los parámetros de búsqueda y navega a `/search`
- **AND** el modal se cierra reutilizando la rutina `onClose()` (animación, desbloqueo de scroll y ocultar overlay)

### Requirement: Mantener el modal abierto con formulario inválido

Cuando el formulario de filtros es inválido, el sistema SHALL mantener el modal abierto y mostrar los errores de validación, sin aplicar el filtro ni navegar.

#### Scenario: Formulario inválido no cierra el modal
- **GIVEN** el modal de filtros está abierto y el formulario es inválido
- **WHEN** el usuario intenta pulsar "Mostrar resultados"
- **THEN** el botón permanece deshabilitado y no se aplica el filtro
- **AND** el modal permanece abierto mostrando los mensajes de validación
