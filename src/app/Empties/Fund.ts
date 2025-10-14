import { Fund } from '../RestModels/Fund';

export function fund(): Fund {
	return {
		id: 0, 
		amount: 0, 
		cashier_hour: new Date(), 
		created_by_user_id: 0, 
		created: new Date(), 
		currency_id: 'MXN', 
		store_id: null, 
		updated: new Date(), 
	};
}
