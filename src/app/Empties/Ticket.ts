import { Ticket } from '../RestModels/Ticket';

export function ticket(): Ticket {
	return {
		id: 0, 
		created: new Date(), 
		created_by_user_id: 0, 
		exceptions_display: 'NEVER', 
		footer: null, 
		header: null, 
		item_money_sign_display: 'NEVER', 
		item_name_display: 'TRUNCATED', 
		item_note_display: 'NEVER', 
		item_price_display: 'NEVER', 
		item_qty1_display: 'NEVER', 
		item_qty2_display: 'NEVER', 
		item_qty_times_price_display: 'NEVER', 
		item_subtotal_display: 'NEVER', 
		item_total_display: 'ALWAYS', 
		name: '', 
		option_item_display: 'NEVER', 
		option_price_display: 'NEVER', 
		option_qty_by_item: 'NEVER', 
		option_row_display: 'NEVER', 
		option_total_qty: 'NEVER', 
		option_total_qty_times_price: 'NEVER', 
		order_note_display: 'ALWAYS', 
		updated: new Date(), 
		updated_by_user_id: 0, 
	};
}
