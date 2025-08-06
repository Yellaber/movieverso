import { Routes } from '@angular/router';

export const detailMovieRoutes: Routes = [
  {
    path: 'movie/:id-slug',
    children: [
      {
        path: '',
        loadComponent: () => import('./detail-movie.component')
      },
      {
        path: 'recommendations',
        loadComponent: () => import('../recommendations/recommendations.component')
      },
      {
        path: 'similar',
        loadComponent: () => import('../similars/similars.component')
      },
      {
        path: '**',
        redirectTo: ''
      }
    ]
  }
];
