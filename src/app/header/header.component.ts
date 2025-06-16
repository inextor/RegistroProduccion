import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap, Router, RouterLink } from '@angular/router';
import { combineLatest, mergeMap, Observable, of, startWith } from 'rxjs';
import { RestService } from '../rest.service';

interface LocationParameters
{
	query:ParamMap,
	params:ParamMap
}

@Component({
	selector: 'app-header',
	imports: [RouterLink],
	templateUrl: './header.component.html',
	styleUrl: './header.component.css'
})
export class HeaderComponent
{

	is_logged_in: boolean = false;

	constructor(private route:ActivatedRoute,private router:Router,private rest_service:RestService)
	{

	}

	logout()
	{
		localStorage.clear();
		this.rest_service.is_logged_in = false;
		this.router.navigate(['/login']);
	}

	ngOnInit()
	{
		this.getQueryParamObservable()
		.subscribe
		(
			(data:LocationParameters) =>
			{
				this.is_logged_in = localStorage.getItem('session') !== null;
			}
		);
	}


	getQueryParamObservable():Observable<LocationParameters>
	{
		let p:ParamMap = {
			has:(_prop)=>false,
			keys:[],
			get:(_value:string)=>{ return null},
			getAll:()=>{ return []},
		};

		return combineLatest
		([
			this.route.queryParamMap.pipe(startWith(p)),
			this.route.paramMap
		])
		.pipe
		(
			mergeMap((foo:ParamMap[]) =>
			{
				return of
				({
					query: foo[0],
					params: foo[1]
				});
			})
		);
	}

}
