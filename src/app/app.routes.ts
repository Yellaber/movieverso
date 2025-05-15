import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component')
  },
  {
    path: 'pelicula/:id-slug',
    loadComponent: () => import('./pages/detail-movie/detail-movie.component')
  },
  {
    path: 'proximamente',
    loadComponent: () => import('./pages/upcoming/upcoming.component')
  },
  {
    path: 'estrenos',
    loadComponent: () => import('./pages/released/released.component')
  },
  {
    path: 'populares',
    loadComponent: () => import('./pages/popular/popular.component')
  },
  {
    path: 'valoradas',
    loadComponent: () => import('./pages/rated/rated.component')
  },
  {
    path: 'tendencia',
    loadComponent: () => import('./pages/trending/trending.component')
  },
  {
    path: 'listado',
    loadComponent: () => import('./pages/list/list.component')
  },
  {
    path: 'buscar',
    loadComponent: () => import('./pages/search/search.component')
  },
  {
    path: 'iniciar-sesion',
    loadComponent: () => import('./pages/sign-in/sign-in.component')
  },
  {
    path: 'registro',
    loadComponent: () => import('./pages/sign-up/sign-up.component')
  },
  {
    path: 'politica-de-privacidad',
    loadComponent: () => import('./pages/politica-privacidad/politica-privacidad.component')
  },
  {
    path: 'terminos-y-condiciones',
    loadComponent: () => import('./pages/terminos-condiciones/terminos-condiciones.component')
  },
  {
    path: '**',
    redirectTo: ''
  }
];
