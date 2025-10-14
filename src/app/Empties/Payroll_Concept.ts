import { Payroll_Concept } from '../RestModels/Payroll_Concept';

export function payroll_concept(): Payroll_Concept {
	return {
		id: 0, 
		formula: '', 
		name: '', 
		status: 'ACTIVE', 
		type: 'DEDUCTION', 
	};
}
