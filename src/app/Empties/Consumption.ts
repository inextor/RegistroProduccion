import { Consumption } from '../RestModels/Consumption';

export function consumption(): Consumption {
	return {
		id: 0, 
		consumed: new Date(), 
		item_id: 0, 
		price: 0, 
		qty: 0, 
		production_area_id: null, 
		consumed_by_user_id: null, 
		store_id: 0, 
		description: null, 
		status: 'ACTIVE', 
		created: new Date(), 
		created_by_user_id: 0, 
		updated: new Date(), 
		updated_by_user_id: 0, 
	};
}
