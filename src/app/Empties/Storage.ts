import { Storage } from '../RestModels/Storage';

export function storage(): Storage {
	return {
		id: 0, 
		created_by_user_id: 0, 
		created: new Date(), 
		level: 0, 
		name: null, 
		parent_storage_id: null, 
		store_id: 0, 
		storage_type_id: 0, 
		updated_by_user_id: 0, 
		updated: new Date(), 
	};
}
