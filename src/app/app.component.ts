import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { RestService } from './rest.service';

@Component
({
	selector: 'app-root',
	imports: [RouterModule],
	templateUrl: './app.component.html',
	styleUrl: './app.component.css'
})
export class AppComponent implements OnInit
{
	constructor(private router: Router, private route: ActivatedRoute, private rest_service: RestService)
	{

	}
	ngOnInit(): void
	{
		if( localStorage.getItem('session') )
		{
			this.router.navigate(['/registrar-produccion']);
		}
		else
		{
			this.router.navigate(['/login']);
		}
	}

	title = 'myapp';
}
