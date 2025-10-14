import { Returns } from '../RestModels/Returns';

export function returns(): Returns {
	return {
		amount_paid: 0, 
		cashier_user_id: 0, 
		client_user_id: null, 
		code: '', 
		currency_id: 'MXN', 
		created: new Date(), 
		id: 0, 
		note: null, 
		order_id: 0, 
		store_id: 0, 
		total: 0, 
		type: 'RETURN_COUPON', 
		updated: new Date(), 
	};
}
