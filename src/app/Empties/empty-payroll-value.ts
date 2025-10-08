import { Payroll_Value } from '../RestModels/Payroll_Value';

export function emptyPayrollValue(): Payroll_Value {
  return {
			id:0,
			payroll_id:0,
			payroll_concept_id:0,
			description: '',
			type:'PERCEPTION',
			value:0,
			status:'ACTIVE',
		}
}
