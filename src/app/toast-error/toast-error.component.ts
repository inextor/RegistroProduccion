import { Component } from '@angular/core';
import { ErrorMessage, RestService } from '../rest.service';
import { CommonModule, NgIf } from '@angular/common';

@Component
({
	selector: 'app-toast-error',
	imports: [CommonModule],
	templateUrl: './toast-error.component.html',
	styleUrl: './toast-error.component.css'
})
export class ToastErrorComponent
{
	error_list:ErrorMessage[] = [];

	constructor(private rest_service:RestService)
	{

	}

	ngOnInit()
	{
		this.rest_service.error_observable.subscribe((error)=>
		{
			if( error == null )
				return;

			if( error.type == '' )
				return;

			let previous = this.error_list.findIndex((e)=>e.type == error.type && e.message == error.message);

			if( this.error_list.length > 4 && previous == -1 )
			{
				this.error_list.shift();
			}

			if( previous !== -1 )
			{
				let prev = this.error_list.splice(previous,1);
				error.count = prev[0].count + 1;
			}

			this.error_list.push( error );

			setTimeout(() =>
			{
				if( error.auto_hide )
				{
					this.clicked(error);
				}
			}, 3500);
		});
	}

	clicked(error:ErrorMessage)
	{
		let index = this.error_list.findIndex
		(
			(i)=>
			{
				return i===error
			}
		);

		if( index > -1 )
		{
			this.error_list.splice(index,1);
		}
	}
}
