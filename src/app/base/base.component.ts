import { Component, OnDestroy } from '@angular/core';
import { RestService, ErrorMessage } from '../rest.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SubSink } from 'subsink';

@Component({
	template: ''
})
export class BaseComponent implements OnDestroy {
	public is_loading: boolean = false;

	subsink = new SubSink();

	constructor(public rest: RestService, public route: ActivatedRoute, Router: Router) {}

	public showError(error: any, auto_hide: boolean = true): void {
		this.is_loading = false;
		if (error instanceof ErrorMessage) {
			this.rest.showErrorMessage(error);
			return;
		}
		let str_error = this.rest.getErrorString(error);
		this.rest.showErrorMessage(new ErrorMessage(str_error, 'alert-danger', auto_hide));
	}

	public showSuccess(message: string): void {
		this.is_loading = false;
		this.rest.showErrorMessage(new ErrorMessage(message, 'alert-success', true));
	}

	public set sink(val:any)
	{
		this.subsink.add(val);
	}

    public ngOnDestroy(): void {
        throw new Error('Method not implemented.');
    }

}
