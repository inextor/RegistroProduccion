import { Component } from '@angular/core';
import { Production } from '../RestClases/Production';
import { RestService } from '../rest.service';
import { RouterLink } from '@angular/router';

import { Observable, combineLatest } from 'rxjs';

@Component({
  selector: 'app-list-item',
  imports: [RouterLink],
  templateUrl: './list-item.component.html',
  styleUrl: './list-item.component.css'
})
export class ListItemComponent
{
    production: Production;
    item_info_list: any[] = [];

	constructor(private rest_service: RestService)
	{
		this.production = new Production(rest_service);
	}

	ngOnInit()
	{
		this.production.getProductionItems()
		.then((data:any) =>
		{
			this.item_info_list = data;
		});
	}
}
