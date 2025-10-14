import { Role } from '../RestModels/Role';

export function role(): Role {
	return {
		id: 0, 
		name: '', 
		created_by_user_id: 0, 
		created: new Date(), 
		updated_by_user_id: 0, 
		updated: new Date(), 
	};
}
