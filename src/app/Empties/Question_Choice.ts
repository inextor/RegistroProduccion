import { Question_Choice } from '../RestModels/Question_Choice';

export function question_choice(): Question_Choice {
	return {
		id: 0, 
		question_id: 0, 
		choice_text: null, 
		choice_value: null, 
	};
}
