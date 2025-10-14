import { Ledger } from '../RestModels/Ledger';

export function ledger(): Ledger {
	return {
		id: 0, 
		account_id: 0, 
		amount: 0, 
		created: new Date(), 
		created_by_user_id: 0, 
		currency_id: 'MXN', 
		description: null, 
		final_balance: 0, 
		ledger_category_id: null, 
		order_id: null, 
		payment_id: null, 
		previous_balance: 0, 
		source_document_id: null, 
		source_document_type: null, 
		transaction_type: 'DEBIT', 
		updated: new Date(), 
		updated_by_user_id: 0, 
	};
}
