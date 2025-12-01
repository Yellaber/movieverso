import { Routes } from '@angular/router';

export const detailMovieRoutes: Routes = [
  {
    path: 'movie/:id-slug',
    children: [
      {
        path: '',
        loadComponent: () => import('./detail-movie')
      },
      {
        path: 'recommendations',
        loadComponent: () => import('../recommendations/recommendations')
      },
      {
        path: 'similar',
        loadComponent: () => import('../similars/similars')
      },
      {
        path: '**',
        redirectTo: ''
      }
    ]
  }
];
