import { Order_Offer } from '../RestModels/Order_Offer';

export function order_offer(): Order_Offer {
	return {
		id: 0, 
		amount: 0, 
		coupon_code: '', 
		order_id: 0, 
		offer_id: null, 
		created_by_user_id: 0, 
		updated_by_user_id: 0, 
		created: new Date(), 
		updated: new Date(), 
	};
}
