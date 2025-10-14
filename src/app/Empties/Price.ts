import { Price } from '../RestModels/Price';

export function price(): Price {
	return {
		id: 0, 
		created_by_user_id: null, 
		created: new Date(), 
		currency_id: 'MXN', 
		item_id: 0, 
		percent: 0, 
		price_list_id: 0, 
		price_type_id: 0, 
		price: 0, 
		tax_included: 'NO', 
		updated_by_user_id: null, 
		updated: new Date(), 
	};
}
