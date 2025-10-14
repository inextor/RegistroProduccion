import { Role_Item_Price } from '../RestModels/Role_Item_Price';

export function role_item_price(): Role_Item_Price {
	return {
		id: 0, 
		created_by_user_id: 0, 
		created: new Date(), 
		item_id: 0, 
		price: 0, 
		role_id: 0, 
		updated_by_user_id: 0, 
		updated: new Date(), 
	};
}
