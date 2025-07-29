import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { RestService } from './rest.service';
import { HeaderComponent } from './header/header.component';
import { ConfirmationService } from './services/confirmation.service';
import { NgIf } from '@angular/common';
import { FormsModule, NgModel } from '@angular/forms';
import { ToastErrorComponent } from './toast-error/toast-error.component';
import { environment } from '../environments/environment';

@Component
({
	selector: 'app-root',
	imports: [RouterModule,HeaderComponent,NgIf,FormsModule,ToastErrorComponent],
	templateUrl: './app.component.html',
	styleUrl: './app.component.css'
})
export class AppComponent implements OnInit
{
	constructor(public router: Router, public route: ActivatedRoute, public rest_service: RestService,public confirmation_service:ConfirmationService)
	{

		console.log('Environment', environment.name);
	}

	confirmation_note_label:string = '';
	confirmation_note_required:boolean = false;
	confirmation_note:string = '';

	ngOnInit(): void
	{
		if( localStorage.getItem('session') )
		{
			//this.router.navigate(['/registrar-produccion']);
		}
		else
		{
			this.router.navigate(['/login']);
		}
	}

	title = 'myapp';
}
