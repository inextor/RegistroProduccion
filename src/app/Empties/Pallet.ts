import { Pallet } from '../RestModels/Pallet';

export function pallet(): Pallet {
	return {
		id: 0, 
		created_by_user_id: null, 
		created: new Date(), 
		production_item_id: null, 
		store_id: null, 
		updated: new Date(), 
	};
}
