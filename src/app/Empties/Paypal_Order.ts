import { Paypal_Order } from '../RestModels/Paypal_Order';

export function paypal_order(): Paypal_Order {
	return {
		id: '', 
		buyer_user_id: 0, 
		create_response: '', 
		created: new Date(), 
		log: null, 
		order_id: null, 
		status: '', 
	};
}
