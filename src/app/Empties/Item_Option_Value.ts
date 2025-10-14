import { Item_Option_Value } from '../RestModels/Item_Option_Value';

export function item_option_value(): Item_Option_Value {
	return {
		id: 0, 
		charge_type: 'OPTIONAL', 
		extra_price: 0, 
		item_id: 0, 
		item_option_id: null, 
		max_extra_qty: 0, 
		portion_amount: 0, 
		price: 0, 
		status: 'ACTIVE', 
	};
}
