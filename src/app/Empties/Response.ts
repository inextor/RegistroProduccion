import { Response } from '../RestModels/Response';

export function response(): Response {
	return {
		id: 0, 
		created: new Date(), 
		created_by_user_id: 0, 
		form_id: 0, 
		respondent_identifier: null, 
		title: null, 
		updated: new Date(), 
		updated_by_user_id: 0, 
		user_id: null, 
	};
}
