import { Period } from '../RestModels/Period';

export function period(): Period {
	return {
		id: 0, 
		created: new Date(), 
		created_by_user_id: 0, 
		end_timestamp: new Date(), 
		minutes_offset: 0, 
		note: null, 
		reservation_id: 0, 
		start_timestamp: new Date(), 
		status: 'ACTIVE', 
		updated: new Date(), 
		updated_by_user_id: 0, 
	};
}
