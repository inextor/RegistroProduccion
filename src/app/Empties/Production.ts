import { Production } from '../RestModels/Production';

export function production(): Production {
	return {
		id: 0, 
		alternate_qty: 0, 
		batch: null, 
		control: null, 
		created_by_user_id: null, 
		created: new Date(), 
		item_id: 0, 
		merma_qty: 0, 
		merma_reason: null, 
		produced: new Date(), 
		produced_by_user_id: null, 
		production_area_id: 0, 
		qty_reported: 0, 
		qty: 0, 
		status: 'ACTIVE', 
		store_id: 0, 
		updated: new Date(), 
		verified_by_user_id: null, 
	};
}
