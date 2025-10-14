import { Shipping_Item } from '../RestModels/Shipping_Item';

export function shipping_item(): Shipping_Item {
	return {
		id: 0, 
		box_id: null, 
		created: new Date(), 
		item_id: null, 
		pallet_id: null, 
		qty: 0, 
		received_qty: 0, 
		requisition_item_id: null, 
		serial_number: null, 
		shipping_id: 0, 
		shrinkage_qty: 0, 
		updated: new Date(), 
	};
}
