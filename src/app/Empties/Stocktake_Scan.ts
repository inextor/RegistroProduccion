import { Stocktake_Scan } from '../RestModels/Stocktake_Scan';

export function stocktake_scan(): Stocktake_Scan {
	return {
		id: 0, 
		stocktake_id: 0, 
		pallet_id: null, 
		box_id: null, 
		box_content_id: null, 
		item_id: null, 
		qty: 0, 
		created_by_user_id: null, 
		updated_by_user_id: null, 
		created: new Date(), 
		updated: new Date(), 
	};
}
