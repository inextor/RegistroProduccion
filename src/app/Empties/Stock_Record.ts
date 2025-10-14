import { Stock_Record } from '../RestModels/Stock_Record';

export function stock_record(): Stock_Record {
	return {
		id: 0, 
		created_by_user_id: 0, 
		created: new Date(), 
		description: null, 
		is_current: null, 
		item_id: 0, 
		movement_qty: 0, 
		movement_type: 'POSITIVE', 
		order_item_id: null, 
		previous_qty: 0, 
		production_item_id: null, 
		purchase_detail_id: null, 
		qty: 0, 
		serial_number_record_id: null, 
		shipping_item_id: null, 
		store_id: 0, 
		updated_by_user_id: 0, 
		updated: new Date(), 
	};
}
