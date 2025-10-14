import { Item_Store } from '../RestModels/Item_Store';

export function item_store(): Item_Store {
	return {
		id: 0, 
		created_by_user_id: 0, 
		created: new Date(), 
		item_id: 0, 
		store_id: 0, 
		pos_preference: 'SHOW', 
		updated_by_user_id: 0, 
		updated: new Date(), 
	};
}
