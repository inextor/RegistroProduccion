import { Storage_Serial } from '../RestModels/Storage_Serial';

export function storage_serial(): Storage_Serial {
	return {
		id: 0, 
		created_by_user_id: 0, 
		created: new Date(), 
		serial_id: 0, 
		sort_weight: 0, 
		storage_id: 0, 
		updated_by_user_id: 0, 
		updated: new Date(), 
	};
}
