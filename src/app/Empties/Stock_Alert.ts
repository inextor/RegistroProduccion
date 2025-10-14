import { Stock_Alert } from '../RestModels/Stock_Alert';

export function stock_alert(): Stock_Alert {
	return {
		created_by_user_id: 0, 
		created: new Date(), 
		id: 0, 
		item_id: 0, 
		max: null, 
		min: null, 
		store_id: 0, 
		updated_by_user_id: 0, 
		updated: new Date(), 
	};
}
