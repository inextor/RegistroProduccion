import { Stocktake } from '../RestModels/Stocktake';

export function stocktake(): Stocktake {
	return {
		id: 0, 
		created_by_user_id: null, 
		created: new Date(), 
		name: null, 
		status: 'ACTIVE', 
		stock_adjustment: 'DIFFERENCE', 
		store_id: 0, 
		updated_by_user_id: null, 
		updated: new Date(), 
	};
}
