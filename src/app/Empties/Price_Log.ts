import { Price_Log } from '../RestModels/Price_Log';

export function price_log(): Price_Log {
	return {
		id: 0, 
		created_by_user_id: 0, 
		created: new Date(), 
		item_id: 0, 
		new_percent: 0, 
		new_price: 0, 
		old_percent: 0, 
		old_price: 0, 
		old_tax_included: 'YES', 
		price_list_id: 0, 
		price_type_id: 0, 
		tax_included: 'NO', 
		updated: new Date(), 
	};
}
