import { Ecommerce_User } from '../RestModels/Ecommerce_User';

export function ecommerce_user(): Ecommerce_User {
	return {
		id: 0, 
		ecommerce_id: 0, 
		user_id: 0, 
		created: new Date(), 
		type: 'ECOMMERCE_ADMIN', 
		updated: new Date(), 
		created_by_user_id: null, 
		updated_by_user_id: null, 
	};
}
