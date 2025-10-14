import { Reservation_Item } from '../RestModels/Reservation_Item';

export function reservation_item(): Reservation_Item {
	return {
		id: 0, 
		created: new Date(), 
		delivered_qty: 0, 
		end: null, 
		item_id: 0, 
		last_period_id: null, 
		note: null, 
		period_type: 'BY_HOUR', 
		price: 0, 
		tax_included: 'YES', 
		qty: 0, 
		reservation_id: 0, 
		returned_qty: 0, 
		scheduled_delivery: null, 
		scheduled_return: null, 
		stock_item_id: 0, 
		start: new Date(), 
		status: 'ACTIVE', 
		updated: new Date(), 
	};
}
