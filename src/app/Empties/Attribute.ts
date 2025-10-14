import { Attribute } from '../RestModels/Attribute';

export function attribute(): Attribute {
	return {
		id: 0, 
		created_by_user_id: 0, 
		created: new Date(), 
		name: '', 
		updated_by_user_id: 0, 
		updated: new Date(), 
	};
}
