import { Order_Item_Exception } from '../RestModels/Order_Item_Exception';

export function order_item_exception(): Order_Item_Exception {
	return {
		id: 0, 
		created: new Date(), 
		description: '', 
		item_exception_id: 0, 
		order_item_id: 0, 
		stock_item_id: null, 
		updated: new Date(), 
	};
}
