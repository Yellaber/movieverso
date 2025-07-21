import { Routes } from '@angular/router';

export const authRoutes: Routes = [
  {
    path: 'auth',
    children: [
      {
        title: 'Iniciar sesión',
        path: 'sign-in',
        loadComponent: () => import('./pages/sign-in/sign-in.component')
      },
      {
        title: 'Registro',
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
