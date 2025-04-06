import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home-page/home-page.component')
  },
  {
    path: 'detalle-pelicula/:id',
    loadComponent: () => import('./pages/detail-movie/detail-movie.component')
  },
  {
    path: 'nuevo',
    loadComponent: () => import('./pages/new-page/new-page.component')
  },
  {
    path: 'popular',
    loadComponent: () => import('./pages/popular-page/popular-page.component')
  },
  {
    path: 'listado',
    loadComponent: () => import('./pages/list-page/list-page.component')
  },
  {
    path: 'buscar',
    loadComponent: () => import('./pages/search-page/search-page.component')
  },
  {
    path: 'iniciar-sesion',
    loadComponent: () => import('./pages/sign-in-page/sign-in-page.component')
  },
  {
    path: 'registro',
    loadComponent: () => import('./pages/sign-up-page/sign-up-page.component')
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
