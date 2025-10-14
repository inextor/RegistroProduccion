import { Brand } from '../RestModels/Brand';

export function brand(): Brand {
	return {
		id: 0, 
		created_by_user_id: null, 
		created: new Date(), 
		description: null, 
		image_id: null, 
		name: '', 
		updated_by_user_id: null, 
		updated: new Date(), 
	};
}
