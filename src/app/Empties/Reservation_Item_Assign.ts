import { Reservation_Item_Assign } from '../RestModels/Reservation_Item_Assign';

export function reservation_item_assign(): Reservation_Item_Assign {
	return {
		id: 0, 
		created_by_user_id: 0, 
		created: new Date(), 
		reservation_item_id: 0, 
		type: 'DELIVERY', 
		updated_by_user_id: 0, 
		updated: new Date(), 
		user_id: 0, 
	};
}
