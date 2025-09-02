import { Routes } from '@angular/router';

const authRoutes: Routes = [
  {
    path: '',
    children: [
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

export default authRoutes;
