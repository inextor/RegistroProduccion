import { Item_Exception } from '../RestModels/Item_Exception';

export function item_exception(): Item_Exception {
	return {
		id: 0, 
		created: new Date(), 
		description: '', 
		item_id: 0, 
		list_as_exception: 'YES', 
		order_type: 'ALL', 
		stock_item_id: null, 
		stock_qty: 0, 
		updated: new Date(), 
	};
}
