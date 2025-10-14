import { Ecommerce_Role_Item } from '../RestModels/Ecommerce_Role_Item';

export function ecommerce_role_item(): Ecommerce_Role_Item {
	return {
		created_by_user_id: 0, 
		created: new Date(), 
		ecommerce_item_id: 0, 
		id: 0, 
		role_id: 0, 
		updated_by_user_id: 0, 
		updated: new Date(), 
	};
}
