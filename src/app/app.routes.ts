import { Routes } from '@angular/router';
import { authRoutes } from './features/auth/auth.routes';
import { detailMovieRoutes } from './features/detail-movie/detail-movie.routes';

export const routes: Routes = [
  {
    title: 'Inicio',
    path: '',
    loadComponent: () => import('./features/home/home.component')
  },
  ...detailMovieRoutes,
  {
    title: 'Próximos estrenos',
    path: 'upcoming',
    loadComponent: () => import('./features/upcoming/upcoming.component')
  },
  {
    title: 'En cartelera',
    path: 'now-playing',
    loadComponent: () => import('./features/now-playing/now-playing.component')
  },
  {
    title: 'Populares',
    path: 'popular',
    loadComponent: () => import('./features/popular/popular.component')
  },
  {
    title: 'Mejor valoradas',
    path: 'top-rated',
    loadComponent: () => import('./features/top-rated/top-rated.component')
  },
  {
    title: 'En tendencia',
    path: 'trending',
    loadComponent: () => import('./features/trending/trending.component')
  },
  {
    title: 'Buscar',
    path: 'search',
    loadComponent: () => import('./features/search/search.component')
  },
  ...authRoutes,
  {
    path: '**',
    redirectTo: ''
  }
];
