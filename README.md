# MovieVerso 🎬

[![Estado de la Build](https://img.shields.io/badge/build-passing-brightgreen)](https://github.com/Yellaber/movieverso)

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
-   Una API KEY para The Movie Database (TMDb).
-   Una API KEY para IPGeolocation.

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

3.  **Configurar el archivo `.env`:**
    Renombra el archivo `.env.template` por `.env` y reemplaza el valor de las API KEYS correspondientes.
    
    `.env.template`:
    ```bash
    API_URL_TMDB='https://api.themoviedb.org/3'
    API_KEY_TMDB=API_KEY_TMDB
    API_URL_IMAGE_TMDB='https://image.tmdb.org/t/p/original'
    API_URL_IPGEOLOCATION='https://api.ipgeolocation.io/v2/ipgeo'
    API_KEY_IPGEOLOCATION=API_KEY_IPGEOLOCATION
    ```

### Scripts Disponibles
-   **Generar las variables de entorno para producción y desarrollo:**
    ```bash
    npm run set:envs
    ```
    Crea la carpeta `src/environments/` y los archivos `environment.ts` y `environment.development.ts` a partir del archivo `.env`.

-   **Iniciar el servidor de desarrollo:**
    ```bash
    npm start
    ```
    La aplicación se abrirá automáticamente en `http://localhost:4200/`.

-   **Construir para producción:**
    ```bash
    npm run build
    ```
    Los archivos optimizados se generarán en la carpeta `dist/movieverso`.

-   **Ejecutar pruebas unitarias:**
    ```bash
    npm run test
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
