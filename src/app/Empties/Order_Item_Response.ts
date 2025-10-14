import { Order_Item_Response } from '../RestModels/Order_Item_Response';

export function order_item_response(): Order_Item_Response {
	return {
		id: 0, 
		response_id: 0, 
		created_by_user_id: 0, 
		created: new Date(), 
		order_item_id: 0, 
		serial_id: null, 
		updated_by_user_id: 0, 
		updated: new Date(), 
	};
}
