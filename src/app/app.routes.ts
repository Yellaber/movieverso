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
    loadComponent: () => import('./pages/detail-movie/detail-movie.component')
  },
  {
    title: 'Próximamente',
    path: 'upcoming',
    loadComponent: () => import('./pages/upcoming/upcoming.component')
  },
  {
    title: 'Estrenos',
    path: 'now-playing',
    loadComponent: () => import('./pages/released/released.component')
  },
  {
    title: 'Populares',
    path: 'populars',
    loadComponent: () => import('./pages/popular/popular.component')
  },
  {
    title: 'Más valoradas',
    path: 'top-rated',
    loadComponent: () => import('./pages/rated/rated.component')
  },
  {
    title: 'En tendencia',
    path: 'trending',
    loadComponent: () => import('./pages/trending/trending.component')
  },
  {
    title: 'Listado',
    path: 'list',
    loadComponent: () => import('./pages/list/list.component')
  },
  {
    title: 'Buscar',
    path: 'search',
    loadComponent: () => import('./pages/search/search.component')
  },
  {
    title: 'Iniciar sesión',
    path: 'auth/sign-in',
    loadComponent: () => import('./pages/auth/sign-in/sign-in.component')
  },
  {
    title: 'Registro',
    path: 'auth/sign-up',
    loadComponent: () => import('./pages/auth/sign-up/sign-up.component')
  },
  {
    title: 'Política de privacidad',
    path: 'politica-de-privacidad',
    loadComponent: () => import('./pages/politica-privacidad/politica-privacidad.component')
  },
  {
    title: 'Términos y condiciones',
    path: 'terminos-y-condiciones',
    loadComponent: () => import('./pages/terminos-condiciones/terminos-condiciones.component')
  },
  {
    path: '**',
    redirectTo: ''
  }
];
