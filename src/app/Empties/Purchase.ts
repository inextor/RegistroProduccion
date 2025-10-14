import { Purchase } from '../RestModels/Purchase';

export function purchase(): Purchase {
	return {
		id: 0, 
		created_by_user_id: null, 
		created: new Date(), 
		order_id: null, 
		provider_name: null, 
		provider_user_id: null, 
		status: 'ACTIVE', 
		stock_status: 'PENDING', 
		store_id: 0, 
		total: 0, 
		updated_by_user_id: null, 
		updated: new Date(), 
		amount_paid: 0, 
		paid_timestamp: null, 
	};
}
