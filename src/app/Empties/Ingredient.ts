import { Ingredient } from '../RestModels/Ingredient';

export function ingredient(): Ingredient {
	return {
		id: 0, 
		created_by_user_id: 0, 
		created: new Date(), 
		item_id: 0, 
		name: '', 
		order_type: 'ALL', 
		qty: 0, 
		stock_item_id: 0, 
		updated_by_user_id: 0, 
		updated: new Date(), 
	};
}
