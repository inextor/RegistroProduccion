import { Sat_Response } from '../RestModels/Sat_Response';

export function sat_response(): Sat_Response {
	return {
		id: 0, 
		created_by_user_id: null, 
		created: new Date(), 
		id_order: 0, 
		request: null, 
		response: null, 
		updated_by_user_id: null, 
		updated: new Date(), 
	};
}
