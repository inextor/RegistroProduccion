import { Points_Log } from '../RestModels/Points_Log';

export function points_log(): Points_Log {
	return {
		id: 0, 
		client_user_id: 0, 
		created_by_user_id: null, 
		created: new Date(), 
		item_id: 0, 
		order_id: 0, 
		points: 0, 
		updated: new Date(), 
	};
}
