import { Item_Option } from '../RestModels/Item_Option';

export function item_option(): Item_Option {
	return {
		id: 0, 
		included_extra_qty: 0, 
		included_options: null, 
		item_id: 0, 
		max_extra_qty: null, 
		max_options: null, 
		min_options: 0, 
		min_selections: 0, 
		name: '', 
		status: 'ACTIVE', 
	};
}
