import { Bank_Movement_Bill } from '../RestModels/Bank_Movement_Bill';

export function bank_movement_bill(): Bank_Movement_Bill {
	return {
		id: 0, 
		amount: 0, 
		bank_movement_id: 0, 
		bill_id: 0, 
		created: new Date(), 
		currency_amount: 0, 
		currency_id: 'MXN', 
		exchange_rate: 0, 
		status: 'ACTIVE', 
		updated: new Date(), 
	};
}
