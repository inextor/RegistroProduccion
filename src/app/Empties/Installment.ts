import { Installment } from '../RestModels/Installment';

export function installment(): Installment {
	return {
		id: 0, 
		amount: 0, 
		created_by_user_id: 0, 
		created: new Date(), 
		due_date: '', 
		installment_number: '', 
		order_id: 0, 
		paid_amount: 0, 
		paid_timestamp: null, 
		status: 'ACTIVE', 
		updated_by_user_id: 0, 
		updated: new Date(), 
	};
}
