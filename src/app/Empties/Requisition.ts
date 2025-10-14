import { Requisition } from '../RestModels/Requisition';

export function requisition(): Requisition {
	return {
		approved_status: 'PENDING', 
		created_by_user_id: null, 
		created: new Date(), 
		date: '', 
		id: 0, 
		note: null, 
		requested_to_store_id: null, 
		required_by_store_id: 0, 
		required_by_timestamp: null, 
		shipped_status: 'PENDING', 
		status: 'PENDING', 
		updated_by_user_id: null, 
		updated: new Date(), 
	};
}
