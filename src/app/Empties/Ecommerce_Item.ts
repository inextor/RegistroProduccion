import { Ecommerce_Item } from '../RestModels/Ecommerce_Item';

export function ecommerce_item(): Ecommerce_Item {
	return {
		id: 0, 
		item_id: 0, 
		ecommerce_id: 0, 
		created: new Date(), 
		updated: new Date(), 
		created_by_user_id: 0, 
		updated_by_user_id: 0, 
	};
}
