import { Routes } from '@angular/router';
import { detailMovieRoutes } from './features/detail-movie/detail-movie-routes';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/home/home')
  },
  ...detailMovieRoutes,
  {
    path: 'upcoming',
    loadComponent: () => import('./features/upcoming/upcoming')
  },
  {
    path: 'now-playing',
    loadComponent: () => import('./features/now-playing/now-playing')
  },
  {
    path: 'popular',
    loadComponent: () => import('./features/popular/popular')
  },
  {
    path: 'top-rated',
    loadComponent: () => import('./features/top-rated/top-rated')
  },
  {
    path: 'trending',
    loadComponent: () => import('./features/trending/trending')
  },
  {
    path: 'search',
    loadComponent: () => import('./features/search/search')
  },
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth-routes')
  },
  {
    path: '**',
    redirectTo: ''
  }
];
