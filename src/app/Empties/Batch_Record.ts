import { Batch_Record } from '../RestModels/Batch_Record';

export function batch_record(): Batch_Record {
	return {
		id: 0, 
		created_by_user_id: 0, 
		created: new Date(), 
		description: null, 
		is_current: null, 
		item_id: 0, 
		batch: '', 
		expiration_date: null, 
		movement_qty: 0, 
		movement_type: 'POSITIVE', 
		order_item_id: null, 
		previous_qty: 0, 
		production_item_id: null, 
		purchase_detail_id: null, 
		qty: 0, 
		shipping_item_id: null, 
		store_id: 0, 
		stock_record_id: null, 
		updated_by_user_id: 0, 
		updated: new Date(), 
	};
}
