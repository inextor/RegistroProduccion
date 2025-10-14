import { Task } from '../RestModels/Task';

export function task(): Task {
	return {
		id: 0, 
		category_id: null, 
		counter: 0, 
		created: new Date(), 
		description: '', 
		in_charge_user_id: null, 
		is_done: '', 
		item_id: null, 
		main_task_id: null, 
		order_id: null, 
		over_extend_qty: 0, 
		parent_task_id: null, 
		process_id: 0, 
		process_status_id: null, 
		production_area_id: 0, 
		qty: 0, 
		requisition_id: null, 
		status: 'ACTIVE', 
		updated: new Date(), 
	};
}
