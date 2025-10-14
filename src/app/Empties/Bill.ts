import { Bill } from '../RestModels/Bill';

export function bill(): Bill {
	return {
		id: 0, 
		accepted_status: 'PENDING', 
		amount_paid: 0, 
		aproved_by_user_id: null, 
		bank_account_id: null, 
		created: new Date(), 
		currency_id: 'MXN', 
		due_date: null, 
		folio: null, 
		invoice_attachment_id: null, 
		name: '', 
		note: null, 
		organization_id: null, 
		paid_by_user_id: null, 
		paid_date: null, 
		paid_status: 'PENDING', 
		paid_to_bank_account_id: null, 
		pdf_attachment_id: null, 
		provider_user_id: null, 
		purchase_id: null, 
		receipt_attachment_id: null, 
		status: 'DELETED', 
		store_id: null, 
		total: 0, 
		updated: new Date(), 
	};
}
