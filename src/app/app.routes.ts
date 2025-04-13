import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component')
  },
  {
    path: 'pelicula/:id',
    loadComponent: () => import('./pages/detail-movie/detail-movie.component')
  },
  {
    path: 'nuevo',
    loadComponent: () => import('./pages/new/new.component')
  },
  {
    path: 'popular',
    loadComponent: () => import('./pages/popular/popular.component')
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
