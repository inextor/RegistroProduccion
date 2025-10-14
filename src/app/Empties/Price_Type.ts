import { Price_Type } from '../RestModels/Price_Type';

export function price_type(): Price_Type {
	return {
		id: 0, 
		created: new Date(), 
		installments: 0, 
		json_tags: null, 
		model: 'AMOUNT', 
		name: '', 
		pv_bar_background_color: '', 
		pv_bar_text_color: '', 
		pv_bar_total_color: '', 
		show_bill_code: 'YES', 
		sort_priority: 0, 
		status: 'ACTIVE', 
		tax_model: 'TAX_INCLUDED', 
		type: 'RETAIL', 
		updated: new Date(), 
		wholesale_min_qty: 0, 
		wholesale_type: 'BY_ARTICLE', 
	};
}
