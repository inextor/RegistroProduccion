import { Paypal_Access_Token } from '../RestModels/Paypal_Access_Token';

export function paypal_access_token(): Paypal_Access_Token {
	return {
		id: 0, 
		access_token: '', 
		created: new Date(), 
		expires: new Date(), 
		raw_response: null, 
	};
}
