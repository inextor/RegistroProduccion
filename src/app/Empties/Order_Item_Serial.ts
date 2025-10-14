import { Order_Item_Serial } from '../RestModels/Order_Item_Serial';

export function order_item_serial(): Order_Item_Serial {
	return {
		id: 0, 
		item_id: 0, 
		order_item_id: 0, 
		serial_id: 0, 
	};
}
