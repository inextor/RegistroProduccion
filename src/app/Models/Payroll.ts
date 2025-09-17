export interface Payroll
{
	id: number;
	created:string;
	end_date:string;
	paid_status: 'PENDING'|'PAID',
	start_date:string;
	status: 'ACTIVE'|'DELETED';
	user_id:number;
	store_id: number;
	subtotal: number;
	total: number;
}
