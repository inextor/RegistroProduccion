import { Merma } from '../RestModels/Merma';

export function merma(): Merma {
	return {
		id: 0, 
		batch: null, 
		box_id: null, 
		created_by_user_id: 0, 
		created: new Date(), 
		item_id: 0, 
		note: null, 
		price: 0, 
		qty: 0, 
		shipping_id: null, 
		store_id: 0, 
		updated: new Date(), 
	};
}
