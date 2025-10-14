import { Storage_Type } from '../RestModels/Storage_Type';

export function storage_type(): Storage_Type {
	return {
		id: 0, 
		created_by_user_id: 0, 
		created: new Date(), 
		name: null, 
		sort_weight: 0, 
		updated_by_user_id: 0, 
		updated: new Date(), 
	};
}
