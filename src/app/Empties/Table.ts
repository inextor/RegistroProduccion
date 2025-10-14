import { Table } from '../RestModels/Table';

export function table(): Table {
	return {
		id: 0, 
		attended_by_user_id: null, 
		capacity: 0, 
		clean_status: 'CLEAN', 
		created_by_user_id: null, 
		created: null, 
		is_dirty: 'NO', 
		name: '', 
		order_id: null, 
		ordered_status: 'PENDING', 
		status: 'ACTIVE', 
		store_id: 0, 
		updated_by_user_id: null, 
		updated: new Date(), 
	};
}
