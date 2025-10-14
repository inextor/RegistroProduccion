import { Box_Content } from '../RestModels/Box_Content';

export function box_content(): Box_Content {
	return {
		id: 0, 
		box_id: 0, 
		initial_qty: 0, 
		item_id: 0, 
		qty: 0, 
		serial_number_range_end: null, 
		serial_number_range_start: null, 
	};
}
