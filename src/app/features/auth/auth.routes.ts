import { Routes } from '@angular/router';

export const authRoutes: Routes = [
  {
    path: 'auth',
    children: [
      {
        path: '',
        redirectTo: 'sign-in',
        pathMatch: 'full'
      },
      {
        path: 'sign-in',
        loadComponent: () => import('./pages/sign-in/sign-in.component')
      },
      {
        path: 'sign-up',
        loadComponent: () => import('./pages/sign-up/sign-up.component')
      },
      {
        path: '**',
        redirectTo: 'sign-in'
      }
    ]
  }
];
