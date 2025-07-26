# MovieVerso 🎬

[![Estado de la Build](https://img.shields.io/badge/build-passing-brightgreen)](https://github.com/Yellaber/movie-verso)

**MovieVerso** es una aplicación web moderna y responsiva para explorar un vasto universo de películas. Descubre estrenos, tendencias, las más populares y las mejor valoradas. Obtén información detallada, recomendaciones y mucho más. ¡Tu portal al cine!

**[➡️ Ver Demo en Vivo](https://movieverso.vercel.app)**

![Captura de pantalla de MovieVerso](https://via.placeholder.com/800x450.png?text=Añade+una+captura+de+pantalla+del+proyecto)

## ✨ Características Principales

-   **Exploración Intuitiva**: Navega por películas divididas en categorías claras:
    -   🍿 En Cartelera
    -   🔥 Populares
    -   ⭐ Mejor Valoradas
    -   📈 En Tendencia
    -   📅 Próximos Estrenos
-   **Búsqueda Potente**: Encuentra cualquier película con un sistema de búsqueda rápido y eficiente.
-   **Detalles Completos**: Accede a páginas de detalle para cada película con sinopsis, puntuación, popularidad, géneros, y más.
-   **Descubrimiento Inteligente**: Obtén listas de películas **recomendadas** y **similares** basadas en tus intereses.
-   **Diseño Responsivo**: Experiencia de usuario fluida y adaptada a cualquier dispositivo, desde móviles hasta ordenadores de escritorio.
-   **Optimización SEO**: Construido con Angular y prerendering para una carga inicial veloz y un excelente posicionamiento en buscadores.
-   **Navegación Infinita**: Carga más películas automáticamente al hacer scroll en las listas.

## 🛠️ Tecnologías Utilizadas

-   **Framework**: Angular v19+
-   **Lenguaje**: TypeScript
-   **Estado de la Aplicación**: Angular Signals
-   **Estilos**: Tailwind CSS
-   **Datos**: The Movie Database (TMDb) API
-   **Tooling**: Angular CLI

## 🚀 Cómo Empezar

Sigue estos pasos para tener una copia del proyecto corriendo en tu máquina local.

### Prerrequisitos

-   Node.js (versión 18.x o superior)
-   Angular CLI instalado globalmente: `npm install -g @angular/cli`
-   Una clave de API de The Movie Database (TMDb). Es gratuita y fácil de obtener.

### Instalación

1.  **Clona el repositorio:**
    ```bash
    git clone https://github.com/tu-usuario/movieverso.git
    cd movieverso
    ```

2.  **Instala las dependencias del proyecto:**
    ```bash
    npm install
    ```

3.  **Configura las variables de entorno:**
    Crea un archivo `environment.ts` dentro de la carpeta `src/environments/`. Puedes copiar el contenido de `environment.development.ts` y modificarlo.

    `src/environments/environment.ts`:
    ```typescript
    export const environment = {
      production: false,
      // Añade tu clave de API de TMDb aquí
      tmdbApiKey: 'TU_CLAVE_DE_API_DE_TMDB',
      // URL base de la API de TMDb
      tmdbApiUrl: 'https://api.themoviedb.org/3',
      // URL base para las imágenes
      tmdbImageUrl: 'https://image.tmdb.org/t/p/original'
    };
    ```
    *Asegúrate de reemplazar `TU_CLAVE_DE_API_DE_TMDB` con tu clave real.*

### Scripts Disponibles

-   **Iniciar el servidor de desarrollo:**
    ```bash
    ng serve -o
    ```
    La aplicación se abrirá automáticamente en `http://localhost:4200/`.

-   **Construir para producción:**
    ```bash
    ng build
    ```
    Los archivos optimizados se generarán en la carpeta `dist/movieverso`.

-   **Ejecutar pruebas unitarias:**
    ```bash
    ng test
    ```

## 📂 Estructura del Proyecto (Simplificada)

```
movieverso/
├── src/
│   ├── app/
│   │   ├── components/     # Componentes reutilizables (botones, cards, etc.)
│   │   ├── pages/          # Componentes de página (Home, MovieDetails, etc.)
│   │   ├── services/       # Servicios (API, SEO, Scroll, etc.)
│   │   ├── models/         # Interfaces y modelos de datos
│   │   └── app.routes.ts   # Definición de rutas principales
│   ├── assets/             # Archivos estáticos (imágenes, fuentes)
│   └── environments/       # Configuración de entornos
├── angular.json            # Configuración del workspace de Angular
├── tailwind.config.js      # Configuración de Tailwind CSS
└── package.json            # Dependencias y scripts del proyecto
```
