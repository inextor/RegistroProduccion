import { Serial } from '../RestModels/Serial';

export function serial(): Serial {
	return {
		id: 0, 
		available_status: 'AVAILABLE', 
		additional_data: null, 
		created_by_user_id: null, 
		created: new Date(), 
		description: null, 
		last_order_id: null, 
		last_reservation_id: null, 
		item_id: 0, 
		serial_number: '', 
		status: 'ACTIVE', 
		store_id: 0, 
		updated_by_user_id: null, 
		updated: new Date(), 
	};
}
