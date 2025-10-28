import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { RestService } from '../rest.service';

@Component({
  selector: 'app-molusca-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './molusca-home.component.html',
  styleUrl: './molusca-home.component.css'
})
export class MoluscaHomeComponent implements OnInit {

	constructor(public rest_service: RestService,private route:ActivatedRoute,private router:Router) {

	}

	ngOnInit()
	{
		this.route.queryParamMap.subscribe
		({
			error:(error:any) => console.error(error),
			next: (params:any) =>
			{
				if( !this.rest_service.isLoggedIn() )
				{
					this.router.navigate(['/login']);
				}
			}
		});
	}
}
