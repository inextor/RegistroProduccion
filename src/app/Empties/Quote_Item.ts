import { Quote_Item } from '../RestModels/Quote_Item';

export function quote_item(): Quote_Item {
	return {
		id: 0, 
		created: new Date(), 
		discount_percent: 0, 
		discount: 0, 
		ieps_calculated: 0, 
		ieps_type: 'RATE', 
		ieps_value: 0, 
		item_id: 0, 
		original_unitary_price: 0, 
		provider_price: 0, 
		qty: 0, 
		quote_id: 0, 
		status: 'ACTIVE', 
		subtotal: 0, 
		tax_included: 'YES', 
		tax: 0, 
		total: 0, 
		unitary_price: 0, 
		updated: new Date(), 
	};
}
