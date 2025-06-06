import { Component, OnInit } from '@angular/core';
import { Production } from '../RestClases/Production';
import { RestService } from '../rest.service';
import { ActivatedRoute } from '@angular/router';
import { HeaderComponent } from "../header/header.component";

@Component({
	selector: 'app-list-production-area',
	imports: [HeaderComponent],
	templateUrl: './list-production-area.component.html',
	styleUrl: './list-production-area.component.css'
})

export class ListProductionAreaComponent implements OnInit
{
	production: Production;

	production_area:any[] = [];

	constructor(public rest_service: RestService, public route: ActivatedRoute)
	{
		this.production = new Production(rest_service);
	}

	ngOnInit()
	{
		this.production.getAllProductionAreas()
		.then((data:any) =>
		{
			this.production_area = data;
		});
	}
}
