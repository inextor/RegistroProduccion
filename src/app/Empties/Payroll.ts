import { Payroll } from '../RestModels/Payroll';

export function payroll(): Payroll {
	return {
		id: 0, 
		created_by_user_id: 0, 
		created: new Date(), 
		end_date: '', 
		paid_status: 'PENDING', 
		paid_timestamp: null, 
		start_date: '', 
		status: 'ACTIVE', 
		store_id: 0, 
		subtotal: 0, 
		total: 0, 
		updated_by_user_id: 0, 
		updated: new Date(), 
		user_id: 0, 
	};
}
