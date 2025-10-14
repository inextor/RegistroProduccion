import { Bank_Movement } from '../RestModels/Bank_Movement';

export function bank_movement(): Bank_Movement {
	return {
		id: 0, 
		amount_received: 0, 
		bank_account_id: null, 
		card_ending: null, 
		client_user_id: null, 
		created: new Date(), 
		currency_id: 'MXN', 
		exchange_rate: 0, 
		invoice_attachment_id: null, 
		note: null, 
		origin_bank_name: null, 
		paid_date: null, 
		payment_id: null, 
		provider_user_id: null, 
		receipt_attachment_id: null, 
		received_by_user_id: null, 
		reference: null, 
		status: 'ACTIVE', 
		total: 0, 
		transaction_type: 'CASH', 
		type: 'expense', 
		updated: new Date(), 
	};
}
