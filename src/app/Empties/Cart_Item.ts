import { Cart_Item } from '../RestModels/Cart_Item';

export function cart_item(): Cart_Item {
	return {
		id: 0, 
		created: new Date(), 
		item_id: 0, 
		qty: 0, 
		session_id: null, 
		type: 'IN_CART', 
		updated: new Date(), 
		user_id: null, 
	};
}
