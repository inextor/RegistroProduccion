import { Reservation_Item_Serial } from '../RestModels/Reservation_Item_Serial';

export function reservation_item_serial(): Reservation_Item_Serial {
	return {
		id: 0, 
		created: new Date(), 
		delivered_qty: 0, 
		created_by_user_id: 0, 
		delivered_timestamp: null, 
		delivery_by_user_id: null, 
		end: null, 
		minutes_offset: 0, 
		note: null, 
		reservation_item_id: 0, 
		returned_qty: 0, 
		returned_timestamp: null, 
		returned_by_user_id: null, 
		schedule_delivery: null, 
		schedule_return: null, 
		serial_id: 0, 
		serial: null, 
		start: null, 
		status: 'ACTIVE', 
		updated: new Date(), 
		updated_by_user_id: 0, 
	};
}
