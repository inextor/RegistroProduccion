import { Ecommerce_Item_Role } from '../RestModels/Ecommerce_Item_Role';

export function ecommerce_item_role(): Ecommerce_Item_Role {
	return {
		id: 0, 
		created_by_user_id: 0, 
		created: new Date(), 
		ecommerce_item_id: 0, 
		role_id: 0, 
		updated: new Date(), 
		updated_by_user_id: 0, 
	};
}
