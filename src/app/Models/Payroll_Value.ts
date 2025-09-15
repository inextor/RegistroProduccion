
export interface Payroll_Value
{
	id:number;
	created: string|Date;
	datetime:string | null,
	description:string;
	payroll_id:number;
	status: 'ACTIVE'|'DELETED';
	value: number;
	type: 'DEDUCTION' | 'PERCEPTION';
}
