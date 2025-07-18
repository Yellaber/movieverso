import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    title: 'Inicio',
    path: '',
    loadComponent: () => import('./pages/home/home.component')
  },
  {
    title: 'Película',
    path: 'movie/:id-slug',
    loadComponent: () => import('./pages/detail-movie/detail-movie.component'),
  },
  {
    title: 'Recomendaciones',
    path: 'movie/:id-slug/recommendations',
    loadComponent: () => import('./pages/recommendations/recommendations.component')
  },
  {
    title: 'Similares',
    path: 'movie/:id-slug/similar',
    loadComponent: () => import('./pages/similars/similars.component')
  },
  {
    title: 'Próximos estrenos',
    path: 'upcoming',
    loadComponent: () => import('./pages/upcoming/upcoming.component')
  },
  {
    title: 'En cartelera',
    path: 'now-playing',
    loadComponent: () => import('./pages/now-playing/now-playing.component')
  },
  {
    title: 'Populares',
    path: 'popular',
    loadComponent: () => import('./pages/popular/popular.component')
  },
  {
    title: 'Mejor valoradas',
    path: 'top-rated',
    loadComponent: () => import('./pages/top-rated/top-rated.component')
  },
  {
    title: 'En tendencia',
    path: 'trending',
    loadComponent: () => import('./pages/trending/trending.component')
  },
  {
    title: 'Buscar',
    path: 'search',
    loadComponent: () => import('./pages/search/search.component')
  },
  {
    path: 'auth',
    children: [
      {
        title: 'Iniciar sesión',
        path: 'sign-in',
        loadComponent: () => import('./pages/auth/sign-in/sign-in.component')
      },
      {
        title: 'Registro',
        path: 'sign-up',
        loadComponent: () => import('./pages/auth/sign-up/sign-up.component')
      },
      {
        path: '**',
        redirectTo: 'sign-in'
      }
    ]
  },
  {
    title: 'Política de privacidad',
    path: 'politica-de-privacidad',
    loadComponent: () => import('./pages/politica-privacidad/politica-privacidad.component')
  },
  {
    title: 'Términos y condiciones',
    path: 'terms-and-conditions',
    loadComponent: () => import('./pages/terminos-condiciones/terminos-condiciones.component')
  },
  {
    path: '**',
    redirectTo: ''
  }
];
