import { Check_In_Raw } from '../RestModels/Check_In_Raw';

export function check_in_raw(): Check_In_Raw {
	return {
		created_by_user_id: 0, 
		created: new Date(), 
		id: 0, 
		user_id: 0, 
	};
}
