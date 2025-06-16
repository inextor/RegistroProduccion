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
	{
		path: 'list-item',
		loadComponent: () => import('./list-item/list-item.component').then(m => m.ListItemComponent),
	},
	{
		path: 'list-item-production',
		loadComponent: () => import('./list-item-production/list-item-production.component').then(m => m.ListItemProductionComponent),
	},
	{
		path: 'production-by-group/:id',
		loadComponent: () => import('./production-by-group/production-by-group.component').then(m => m.ProductionByGroupComponent),
	},

];
