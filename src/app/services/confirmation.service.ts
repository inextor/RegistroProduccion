import { Injectable } from '@angular/core';
import { fromEvent, Observable, Subject, take } from 'rxjs';

export interface ConfirmationResult
{
	accepted:boolean;
	obj:any;
}


@Injectable({
	providedIn: 'root'
})
export class ConfirmationService {
	confirm = new Subject<ConfirmationResult>();
	confirm_permission = new Subject<ConfirmationResult>();

	obj:any = null;
	title:string = '';
	description:string = '';
	ok_button:string = '';
	cancel_button:string = '';
	show_confirmation:boolean = false;
	permission_title:string = '';
	permission_description:string = '';
	permission_ok_button:string = '';
	show_permission:boolean = false;
	permission_name:string = '';
	permission_cancel_button: string = 'Cancelar';
	note_required: boolean = false
	note_label: string = 'Nota';
	dialog: HTMLDialogElement;

	constructor()
	{
		this.dialog = window.document.getElementById('confirmation') as HTMLDialogElement;

		fromEvent(window.document.body, 'keyup').subscribe
		({
			next:(evt:any)=>
			{
				if( evt.key == "Escape" )
				{
					if( this.show_confirmation )
						this.onCancel();

					if( this.show_permission )
						this.onCancelPermission();

					if( this.dialog )
					{
						this.dialog.close();
					}
				}
			},
			error:(error)=>
			{
				console.log(error);
			}
		});
	}

	showConfirmAlert(obj:any, title:string,description:string, ok_button:string = 'OK', cancel_button:string='Cancelar',note_required:boolean=false,note_label:string='Nota'):Observable<ConfirmationResult>
	{
		this.title = title;
		this.obj = obj;
		this.description = description;
		this.ok_button = ok_button;
		this.cancel_button = cancel_button;
		this.show_confirmation = true;
		this.note_required = note_required;
		this.note_label = note_label;

		if(!this.dialog)
		{
			this.dialog = window.document.getElementById('confirmation') as HTMLDialogElement;
		}

		this.dialog.showModal();

		return this.confirm.asObservable().pipe( take(1) );
	}

	/*
	showAskForPermission(obj:any, title:string, description:string,permission_name:string, ok_button:string = 'OK', cancel_button:string ='Cancelar'):Observable<ConfirmationResult>
	{
		this.permission_title = title;
		this.permission_description = description;
		this.permission_ok_button = ok_button;
		this.permission_cancel_button = cancel_button;
		let extra = {};
		extra[ permission_name ] = '1';

		//this.rest.permission.search({
		//	extra: extra
		//})
	}
	*/

	onCancel()
	{
		this.confirm.next({accepted: false , obj: this.obj });
		this.dialog.close();
		this.show_confirmation = false;
	}

	onAccept()
	{
		this.confirm.next({ accepted: true, obj: this.obj });
		this.dialog.close();
		this.show_confirmation = false;
	}

	onCancelPermission()
	{
		this.dialog.close();
		this.confirm_permission.next({accepted:false, obj: this.obj });
	}
	onAcceptPermission()
	{
		this.confirm_permission.next({accepted:true, obj: this.obj });
		this.dialog.close();
	}
}
