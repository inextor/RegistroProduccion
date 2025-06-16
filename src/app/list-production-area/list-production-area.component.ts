import { Component, OnInit } from '@angular/core';
import { Production } from '../RestClases/Production';
import { RestService } from '../rest.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
	selector: 'app-list-production-area',
	imports: [RouterModule],
	templateUrl: './list-production-area.component.html',
	styleUrl: './list-production-area.component.css'
})

export class ListProductionAreaComponent implements OnInit
{
	production: Production;

	production_area_list:any[] = [];

	constructor(public rest_service: RestService, public route: ActivatedRoute, router: Router)
	{
		this.production = new Production(rest_service);
	}

	ngOnInit()
	{
		this.production.getAllProductionAreas()
		.then((data:any) =>
		{
			/* data has
			[
    {
        "id": 1,
        "created": "2025-05-22 21:23:53",
        "name": "TEST NESTOR",
        "status": "ACTIVE",
        "store_id": 1,
        "updated": "2025-05-22 21:23:53"
    },
    {
        "id": 2,
        "created": "2025-06-05 21:58:11",
        "name": "ALMEJA SAN FELIPE",
        "status": "ACTIVE",
        "store_id": 1,
        "updated": "2025-06-05 21:58:11"
    },
    {
        "id": 3,
        "created": "2025-06-06 00:14:21",
        "name": "EQUIPO OKYMI",
        "status": "ACTIVE",
        "store_id": 1,
        "updated": "2025-06-06 00:14:21"
    }
]
			*/
			this.production_area_list = data;
		});
	}
}
