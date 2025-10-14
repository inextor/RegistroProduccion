import { Quote_Request } from '../RestModels/Quote_Request';

export function quote_request(): Quote_Request {
	return {
		id: 0, 
		quote_id: null, 
		user_id: 0, 
		email: '', 
	};
}
