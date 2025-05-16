import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    title: 'Inicio',
    path: '',
    loadComponent: () => import('./pages/home/home.component')
  },
  {
    title: 'Película',
    path: 'pelicula/:id-slug',
    loadComponent: () => import('./pages/detail-movie/detail-movie.component')
  },
  {
    title: 'Próximamente',
    path: 'proximamente',
    loadComponent: () => import('./pages/upcoming/upcoming.component')
  },
  {
    title: 'Estrenos',
    path: 'estrenos',
    loadComponent: () => import('./pages/released/released.component')
  },
  {
    title: 'Populares',
    path: 'populares',
    loadComponent: () => import('./pages/popular/popular.component')
  },
  {
    title: 'Más valoradas',
    path: 'valoradas',
    loadComponent: () => import('./pages/rated/rated.component')
  },
  {
    title: 'En tendencia',
    path: 'tendencia',
    loadComponent: () => import('./pages/trending/trending.component')
  },
  {
    title: 'Listado',
    path: 'listado',
    loadComponent: () => import('./pages/list/list.component')
  },
  {
    title: 'Buscar',
    path: 'buscar',
    loadComponent: () => import('./pages/search/search.component')
  },
  {
    title: 'Iniciar sesión',
    path: 'auth/iniciar-sesion',
    loadComponent: () => import('./pages/auth/sign-in/sign-in.component')
  },
  {
    title: 'Registro',
    path: 'auth/registro',
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
