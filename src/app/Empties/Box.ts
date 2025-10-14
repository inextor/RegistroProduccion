import { Box } from '../RestModels/Box';

export function box(): Box {
	return {
		id: 0, 
		created: new Date(), 
		production_item_id: null, 
		serial_number_range_end: null, 
		serial_number_range_start: null, 
		status: 'ACTIVE', 
		store_id: null, 
		type_item_id: 0, 
		updated: new Date(), 
	};
}
