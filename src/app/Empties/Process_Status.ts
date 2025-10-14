import { Process_Status } from '../RestModels/Process_Status';

export function process_status(): Process_Status {
	return {
		id: 0, 
		created: new Date(), 
		mark_task_as_done: '', 
		name: '', 
		process_id: 0, 
		status: 'ACTIVE', 
		updated: new Date(), 
	};
}
