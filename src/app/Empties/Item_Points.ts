import { Item_Points } from '../RestModels/Item_Points';

export function item_points(): Item_Points {
	return {
		id: 0, 
		created_by_user_id: 0, 
		created: new Date(), 
		item_id: 0, 
		qty: 0, 
		type: 'AMOUNT', 
		updated_by_user_id: 0, 
		updated: new Date(), 
	};
}
