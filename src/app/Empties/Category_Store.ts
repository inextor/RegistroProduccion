import { Category_Store } from '../RestModels/Category_Store';

export function category_store(): Category_Store {
	return {
		id: 0, 
		category_id: 0, 
		created_by_user_id: 0, 
		created: new Date(), 
		pos_preference: 'SHOW', 
		store_id: 0, 
		updated_by_user_id: 0, 
		updated: new Date(), 
	};
}
