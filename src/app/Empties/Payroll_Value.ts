import { Payroll_Value } from '../RestModels/Payroll_Value';

export function payroll_value(): Payroll_Value {
	return {
		id: 0, 
		account_id: null, 
		datetime: null, 
		description: null, 
		payroll_concept_id: null, 
		payroll_id: 0, 
		status: 'ACTIVE', 
		type: 'PERCEPTION', 
		value: 0, 
	};
}
