import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./login/login.component').then(m => m.LoginComponent),
  },
  {
    path: 'registrar-produccion2',
    loadComponent: () => import('./registrar-produccion2/registrar-produccion2.component').then(m => m.RegistrarProduccion2Component),
  },
  {
    path: 'registrar-produccion',
    loadComponent: () => import('./registrar-produccion/registrar-produccion.component').then(m => m.RegistrarProduccionComponent),
  },
];
