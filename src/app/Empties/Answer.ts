import { Answer } from '../RestModels/Answer';

export function answer(): Answer {
	return {
		id: 0, 
		answer_choice_id: null, 
		answer_number: null, 
		answer_text: null, 
		question_id: 0, 
		response_id: 0, 
	};
}
