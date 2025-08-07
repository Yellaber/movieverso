import { Routes } from '@angular/router';
import { authRoutes } from './features/auth/auth.routes';
import { detailMovieRoutes } from './features/detail-movie/detail-movie.routes';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/home/home.component')
  },
  ...detailMovieRoutes,
  {
    path: 'upcoming',
    loadComponent: () => import('./features/upcoming/upcoming.component')
  },
  {
    path: 'now-playing',
    loadComponent: () => import('./features/now-playing/now-playing.component')
  },
  {
    path: 'popular',
    loadComponent: () => import('./features/popular/popular.component')
  },
  {
    path: 'top-rated',
    loadComponent: () => import('./features/top-rated/top-rated.component')
  },
  {
    path: 'trending',
    loadComponent: () => import('./features/trending/trending.component')
  },
  {
    path: 'search',
    loadComponent: () => import('./features/search/search.component')
  },
  ...authRoutes,
  {
    path: '**',
    redirectTo: ''
  }
];
