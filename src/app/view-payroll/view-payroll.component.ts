import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { RestService } from '../rest.service';
import { Payroll } from '../Models/Payroll';
import { User } from '../Models/User';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { Rest } from '../classes/Rest';
import { Payroll_Value } from '../Models/Payroll_Value';
import { GetEmpty, PayrollInfo } from '../RestClases/GetEmpty';


@Component({
	selector: 'app-view-payroll',
	standalone: true,
	imports: [CommonModule, RouterModule, DatePipe, CurrencyPipe],
	templateUrl: './view-payroll.component.html',
	styleUrl: './view-payroll.component.css'
})
export class ViewPayrollComponent implements OnInit {
	payroll_id: number = 0;
	payroll: Payroll | null = null;
	user: User | null = null;
	rest_payroll: Rest;
	is_loading: boolean = false;
	payroll_info = GetEmpty.payroll_info();
	perceptions: Payroll_Value[] = [];
	deductions: Payroll_Value[] = [];

	constructor(
	private rest_service:RestService,
	private route: ActivatedRoute,
	private rest: RestService
	) {

		this.rest_payroll = new Rest(rest_service,'payroll_info');
	}

	ngOnInit(): void {
	this.route.params.subscribe(params => {
		this.payroll_id = params['id'];
		this.loadPayrollData();
	});
	}

	loadPayrollData() {
		this.rest_payroll.get( this.payroll_id )
			.then((response)=>{
				this.payroll_info = response;
				this.perceptions = this.payroll_info.values.filter(v => v.type === 'PERCEPTION');
				this.deductions = this.payroll_info.values.filter(v => v.type === 'DEDUCTION');
			})
			.catch((error)=>this.rest_service.showError(error))
			.finally(()=>{this.is_loading = false});

	}
}
