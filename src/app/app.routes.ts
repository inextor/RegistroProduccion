import { Routes } from '@angular/router';

export const routes: Routes = [
	{
		path: 'login',
		loadComponent: () => import('./login/login.component').then(m => m.LoginComponent),
	},
	{
		path: 'registrar-produccion',
		loadComponent: () => import('./registrar-produccion/registrar-produccion.component').then(m => m.RegistrarProduccionComponent),
	},
	{
		path: 'list-production-area',
		loadComponent: () => import('./list-production-area/list-production-area.component').then(m => m.ListProductionAreaComponent),
	},
];
