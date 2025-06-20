import { Component } from '@angular/core';
import { RestService } from '../rest.service';
import { RouterLink } from '@angular/router';
import { RestProduction } from '../RestClases/RestProduction';

import { Observable, combineLatest } from 'rxjs';

@Component({
  selector: 'app-list-item',
  imports: [RouterLink],
  templateUrl: './list-item.component.html',
  styleUrl: './list-item.component.css'
})
export class ListItemComponent
{
    rest_production: RestProduction;
    item_info_list: any[] = [];

	constructor(private rest_service: RestService)
	{
		this.rest_production = new RestProduction(rest_service);
	}

	ngOnInit()
	{
		this.rest_production.getProductionItems()
		.then((data:any) =>
		{
			this.item_info_list = data;
		});
	}
}
