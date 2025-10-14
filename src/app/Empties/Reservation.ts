import { Reservation } from '../RestModels/Reservation';

export function reservation(): Reservation {
	return {
		id: 0, 
		address_id: null, 
		client_name: '', 
		created: new Date(), 
		created_by_user_id: 0, 
		condition: 'DRAFT', 
		currency_id: 'MXN', 
		note: null, 
		price_type_id: 0, 
		start: new Date(), 
		status: 'ACTIVE', 
		store_id: 0, 
		updated: new Date(), 
		updated_by_user_id: 0, 
		user_id: null, 
	};
}
