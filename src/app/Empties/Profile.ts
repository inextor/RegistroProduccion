import { Profile } from '../RestModels/Profile';

export function profile(): Profile {
	return {
		created_by_user_id: 0, 
		created: new Date(), 
		ecommerce_id: 0, 
		id: 0, 
		name: '', 
		updated_by_user_id: 0, 
		updated: new Date(), 
	};
}
