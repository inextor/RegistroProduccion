import { Returned_Item } from '../RestModels/Returned_Item';

export function returned_item(): Returned_Item {
	return {
		created: new Date(), 
		id: 0, 
		item_id: 0, 
		returned_qty: 0, 
		returns_id: 0, 
		total: 0, 
		updated: new Date(), 
	};
}
