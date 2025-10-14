import { Stocktake_Item } from '../RestModels/Stocktake_Item';

export function stocktake_item(): Stocktake_Item {
	return {
		id: 0, 
		box_content_id: null, 
		box_id: null, 
		created_by_user_id: null, 
		created: new Date(), 
		db_qty: 0, 
		item_id: 0, 
		pallet_id: null, 
		real_qty: 0, 
		stocktake_id: 0, 
		updated_by_user_id: null, 
		updated: new Date(), 
	};
}
