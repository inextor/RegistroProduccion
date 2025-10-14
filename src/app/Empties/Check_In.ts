import { Check_In } from '../RestModels/Check_In';

export function check_in(): Check_In {
	return {
		created_by_user_id: null, 
		current: '', 
		date: null, 
		id: 0, 
		end_timestamp: null, 
		start_timestamp: new Date(), 
		updated_by_user_id: null, 
		user_id: 0, 
		workshift_id: null, 
	};
}
