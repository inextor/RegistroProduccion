import { Routes } from '@angular/router';

export const routes: Routes = [
	{
		path: 'login',
		loadComponent: () => import('./login/login.component').then(m => m.LoginComponent),
	},
	{
		path: 'list-gasolina',
		loadComponent: () => import('./list-gasolina/list-gasolina.component').then(m => m.ListGasolinaComponent),
	},
	{
		path: 'list-users',
		loadComponent: () => import('./list-users/list-users.component').then(m => m.ListUsersComponent),
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
	{
		path: 'resumen-production',
		loadComponent: () => import('./resumen-production/resumen-production.component').then(m => m.ResumenProductionComponent),
	},
	{
		path: 'list-production-area-production',
		loadComponent: () => import('./list-production-area-production/list-production-area-production.component').then(m => m.ListProductionAreaProductionComponent),
	},
	{
		path: 'registrar-gasolina',
		loadComponent: () => import('./registrar-gasolina/registrar-gasolina.component').then(m => m.RegistrarGasolinaComponent),
	},
	{
		path: 'generar-nomina',
		loadComponent: () => import('./generar-nomina/generar-nomina.component').then(m => m.GenerarNominaComponent),
	},
	{
		path: 'generar-nomina-alterno',
		loadComponent: () => import('./generar-nomina-alterno/generar-nomina-alterno.component').then(m => m.GenerarNominaAlternoComponent),
	},
	{
		path: 'generar-nomina-print',
		loadComponent: () => import('./generar-nomina-print/generar-nomina-print.component').then(m => m.GenerarNominaPrintComponent),
	},
	{
		path: 'listar-nominas',
		loadComponent: () => import('./listar-nominas/listar-nominas.component').then(m => m.ListarNominasComponent),
	},
	{
		path: 'payroll',
		loadComponent: () => import('./generar-nomina/generar-nomina.component').then(m => m.GenerarNominaComponent),
	},
	{
		path: 'view-payroll/:id',
		loadComponent: () => import('./view-payroll/view-payroll.component').then(m => m.ViewPayrollComponent),
	},
	{
		path: 'ver-estado-de-cuenta',
		loadComponent: () => import('./ver-estado-de-cuenta/ver-estado-de-cuenta.component').then(m => m.VerEstadoDeCuentaComponent),
	},
	{
		path: 'list-estados-cuenta',
		loadComponent: () => import('./list-estados-cuenta/list-estados-cuenta.component').then(m => m.ListEstadosCuentaComponent),
	}
];