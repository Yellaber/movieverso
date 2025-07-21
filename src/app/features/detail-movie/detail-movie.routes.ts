import { Routes } from '@angular/router';

export const detailMovieRoutes: Routes = [
  {
    path: 'movie/:id-slug',
    children: [
      {
        title: 'Detalle',
        path: '',
        loadComponent: () => import('./detail-movie.component')
      },
      {
        title: 'Recomendaciones',
        path: 'recommendations',
        loadComponent: () => import('../recommendations/recommendations.component')
      },
      {
        title: 'Similares',
        path: 'similar',
        loadComponent: () => import('../similars/similars.component')
      },
    ]
  }
];
