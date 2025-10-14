import { Work_Log } from '../RestModels/Work_Log';

export function work_log(): Work_Log {
	return {
		id: 0, 
		break_seconds: 0, 
		date: '', 
		disciplinary_actions: null, 
		docking_pay: 0, 
		end_timestamp: null, 
		extra_hours: 0, 
		hours: 0, 
		in_out_count: '', 
		json_values: null, 
		on_time: 'YES', 
		seconds_log: 0, 
		start_timestamp: null, 
		total_payment: 0, 
		updated: new Date(), 
		user_id: 0, 
	};
}
