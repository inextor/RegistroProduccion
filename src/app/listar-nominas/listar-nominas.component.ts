import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RestService } from '../rest.service';
import { Payroll } from '../Models/Payroll';
import { BaseComponent } from '../base/base.component';
import { ActivatedRoute, ParamMap, Router, RouterModule } from '@angular/router';
import { Rest, RestResponse } from '../classes/Rest';
import { Payroll_Value } from '../Models/Payroll_Value';
import { User } from '../Models/User';
import { ConfirmationService } from '../services/confirmation.service';
import { filter, mergeMap } from 'rxjs';
import { Utils } from '../classes/DateUtils';
import { ShortDatePipe } from '../pipes/short-date.pipe';
import { LocalDatePipe } from '../pipes/local-date.pipe';

interface PayrollInfo{
	payroll:Payroll;
	user:User;
	values:Payroll_Value[];
}

@Component({
	selector: 'app-listar-nominas',
	standalone: true,
	imports: [CommonModule, FormsModule, RouterModule, ShortDatePipe, LocalDatePipe],
	templateUrl: './listar-nominas.component.html',
	styleUrls: ['./listar-nominas.component.css']
})
export class ListarNominasComponent {

	search_from_date: string = this.getDefaultStartDate();
	search_to_date: string = this.getDefaultEndDate();

	rest_payroll_info:Rest;
	is_loading:boolean	= false;
	payroll_list: PayrollInfo[] = [];
    rest_payroll:Rest;

	constructor(public rest_service: RestService, public route: ActivatedRoute, public router:Router, public confirmation: ConfirmationService) {
		this.rest_payroll_info = new Rest(rest_service,'payroll_info');
		this.rest_payroll = new Rest(rest_service, 'payroll');
	}

	ngOnInit(): void {

		this.searchData();

		this.route.queryParamMap.subscribe
		(
			(query:ParamMap)=>{
				let sfd = 'search_from_date';
				let std = 'search_to_date';

				this.search_from_date = query.has( sfd )
					? query.get( sfd ) as string
					: this.getDefaultStartDate();

				this.search_to_date = query.has( std )
					? query.get( std) as string
					: this.getDefaultEndDate();

				this.searchData();
			}
		);
	}

	getDefaultStartDate():string
	{
		let start_date = new Date();
		start_date.setDate(start_date.getDate()-7);

		return Utils.getLocalMysqlStringFromDate( start_date ).substring(0, 10 );
	}

	getDefaultEndDate()
	{
		let end_date = new Date();
		return Utils.getLocalMysqlStringFromDate( end_date ).substring( 0, 10);
	}

	markAsPaid(pi: PayrollInfo) {

		console.log('Updating ts',pi);
		this.confirmation.showConfirmAlert(pi, 'Pagar Nómina', '¿Esta seguro de marcarlo como pagado?')
		.pipe(
			filter(response => response.accepted),
			mergeMap(response => {
				this.is_loading = true;
				let payroll = { ...pi.payroll };

				payroll.paid_timestamp = (new Date()).toISOString().replace('T',' ').substring(0,19);
				payroll.paid_status = 'PAID';

				return this.rest_payroll.update(payroll);
			})
		)
		.subscribe({
			next: (response) => {
				this.is_loading = false;
				this.searchData();
			},
			error: (error) => {
				this.is_loading = false;
				this.rest_service.showError(error);
			}
		});
	}

	searchData() {

		this.is_loading = true;

		//'_custom' => 'start_date <= "'.$payroll->end_date.'" AND end_date >= "'.$payroll->start_date.'"'

		this.rest_payroll_info.search({
			'start_date<~': this.search_to_date,
			'end_date>~': this.search_from_date,
			'status':'ACTIVE'
		})
		.then((response:RestResponse<PayrollInfo>)=>{
			this.payroll_list = response.data;
			this.is_loading = false;
		})
		.catch((error)=>this.rest_service.showError(error))
		.finally(()=>this.is_loading = false );
	}

	search()
	{
		let queryParams = {
			search_from_date : this.search_from_date,
			search_to_date: this.search_to_date
		};

		this.router.navigate(['/listar-nominas'],{queryParams});
	}

	deletePayrroll(payroll_info:PayrollInfo)
	{
		this.confirmation.showConfirmAlert(payroll_info, 'Eliminar Nómina', '¿Esta seguro de eliminarla?')
		.pipe
		(
			filter(response=>response.accepted)
		)
		.subscribe
		({
			next:(response)=>
			{
				this.is_loading = true;
				this.rest_payroll.delete({id:payroll_info.payroll.id})
				.then(()=>
				{
					this.is_loading = false;
					this.rest_service.showSuccess('Nómina eliminada');
					this.searchData();
				})
				.catch((error)=>
				{
					this.is_loading = false;
					this.rest_service.showError(error);
				});
			},
			error:(error)=>
			{
				this.is_loading = false;
				this.rest_service.showError(error)
			}
		});
	}
}
