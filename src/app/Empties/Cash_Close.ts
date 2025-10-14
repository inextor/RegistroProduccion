import { Cash_Close } from '../RestModels/Cash_Close';

export function cash_close(): Cash_Close {
	return {
		id: 0, 
		cash_on_hand: 0, 
		created_by_user_id: 0, 
		created: new Date(), 
		end: new Date(), 
		note: null, 
		other_currencies: 0, 
		since: null, 
		start: new Date(), 
		updated: new Date(), 
	};
}
