import { Bank_Movement_Order } from '../RestModels/Bank_Movement_Order';

export function bank_movement_order(): Bank_Movement_Order {
	return {
		id: 0, 
		amount: 0, 
		bank_movement_id: 0, 
		created_by_user_id: null, 
		created: new Date(), 
		currency_amount: 0, 
		currency_id: 'MXN', 
		exchange_rate: 0, 
		order_id: 0, 
		status: 'ACTIVE', 
		updated_by_user_id: null, 
		updated: new Date(), 
	};
}
