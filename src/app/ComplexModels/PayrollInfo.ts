import { Payroll, Payroll_Value, User } from "../RestModels";

export interface PayrollInfo
{
	values: Payroll_Value[];
	user: User;
	payroll:Payroll;
}

