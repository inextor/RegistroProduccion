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
import { PaginationComponent } from '../components/pagination/pagination.component';

interface PayrollInfo{
	payroll:Payroll;
	user:User;
	values:Payroll_Value[];
}

@Component({
	selector: 'app-listar-nominas',
	standalone: true,
	imports: [CommonModule, FormsModule, RouterModule, ShortDatePipe, LocalDatePipe, PaginationComponent],
	templateUrl: './listar-nominas.component.html',
	styleUrls: ['./listar-nominas.component.css']
})
export class ListarNominasComponent {

	search_from_date: string = this.getDefaultStartDate();

	rest_payroll_info:Rest;
	is_loading:boolean	= false;
	payroll_list: PayrollInfo[] = [];
    rest_payroll:Rest;
	page: number = 0;
	limit: number = 20;
	total: number = 0;
	total_pages: number = 0;

	constructor(public rest_service: RestService, public route: ActivatedRoute, public router:Router, public confirmation: ConfirmationService) {
		this.rest_payroll_info = new Rest(rest_service,'payroll_info');
		this.rest_payroll = new Rest(rest_service, 'payroll');
	}

	ngOnInit(): void {

		this.route.queryParamMap.subscribe
		(
			(query:ParamMap)=>{
				let sfd = 'search_from_date';

				this.search_from_date = query.has( sfd )
					? query.get( sfd ) as string
					: this.getDefaultStartDate();

				let page_str = query.get('page');
				this.page = page_str ? parseInt(page_str) : 0;

				let limit_str = query.get('limit');
				this.limit = limit_str ? parseInt(limit_str) : 20;

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

		this.rest_payroll_info.search({
			'end_date>~': this.search_from_date,
			'status':'ACTIVE',
			'page': this.page,
			'limit': this.limit,
			'_sort': 'id_DESC'
		})
		.then((response:RestResponse<PayrollInfo>)=>{
			this.payroll_list = response.data;
			this.total = response.total;
			this.total_pages = Math.ceil(this.total / this.limit);
			this.is_loading = false;
		})
		.catch((error)=>this.rest_service.showError(error))
		.finally(()=>this.is_loading = false );
	}

	search()
	{
		let queryParams = {
			search_from_date : this.search_from_date,
			page: 0
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
