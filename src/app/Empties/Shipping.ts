import { Shipping } from '../RestModels/Shipping';

export function shipping(): Shipping {
	return {
		id: 0, 
		created_by_user_id: null, 
		created: new Date(), 
		date: '', 
		delivery_timestamp: null, 
		from_store_id: null, 
		note: null, 
		production_area_id: null, 
		purchase_id: null, 
		received_by_user_id: null, 
		requisition_id: null, 
		shipping_company: '', 
		shipping_guide: '', 
		status: 'PENDING', 
		to_store_id: 0, 
		updated_by_user_id: null, 
		updated: new Date(), 
	};
}
