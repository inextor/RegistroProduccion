import { Storage_Item } from '../RestModels/Storage_Item';

export function storage_item(): Storage_Item {
	return {
		id: 0, 
		created_by_user_id: 0, 
		created: new Date(), 
		item_id: 0, 
		storage_id: 0, 
		updated_by_user_id: 0, 
		updated: new Date(), 
	};
}
