import { Question } from '../RestModels/Question';

export function question(): Question {
	return {
		id: 0, 
		created: new Date(), 
		form_id: 0, 
		help: null, 
		priority: 0, 
		question: '', 
		type: 'text', 
		required: null, 
		status: 'ACTIVE', 
		updated: new Date(), 
	};
}
