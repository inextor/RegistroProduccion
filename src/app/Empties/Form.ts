import { Form } from '../RestModels/Form';

export function form(): Form {
	return {
		id: 0, 
		created: new Date(), 
		created_by_user_id: 0, 
		description: null, 
		is_active: null, 
		is_response_title_required: null, 
		responses_allowed: 0, 
		title: '', 
		updated: new Date(), 
		updated_by_user_id: 0, 
	};
}
