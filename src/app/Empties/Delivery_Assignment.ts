import { Delivery_Assignment } from '../RestModels/Delivery_Assignment';

export function delivery_assignment(): Delivery_Assignment {
	return {
		id: 0, 
		created_by_user_id: 0, 
		created: new Date(), 
		reservation_item_id: 0, 
		updated_by_user_id: 0, 
		updated: new Date(), 
		user_id: 0, 
	};
}
