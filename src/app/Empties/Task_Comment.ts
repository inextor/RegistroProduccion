import { Task_Comment } from '../RestModels/Task_Comment';

export function task_comment(): Task_Comment {
	return {
		id: 0, 
		comment: '', 
		created: new Date(), 
		task_id: 0, 
		type: 'SYSTEM', 
		updated: new Date(), 
		user_id: null, 
	};
}
