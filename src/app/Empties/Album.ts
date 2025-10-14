import { Album } from '../RestModels/Album';

export function album(): Album {
	return {
		id: 0, 
		created: new Date(), 
		created_by_user_id: 0, 
		description: null, 
		name: '', 
		updated: new Date(), 
		updated_by_user_id: 0, 
	};
}
