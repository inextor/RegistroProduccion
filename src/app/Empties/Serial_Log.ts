import { Serial_Log } from '../RestModels/Serial_Log';

export function serial_log(): Serial_Log {
	return {
		id: 0, 
		serial_id: 0, 
		note: '', 
		reservation_item_id: 0, 
		timestamp: new Date(), 
	};
}
