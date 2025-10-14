import { Payment } from '../RestModels/Payment';

export function payment(): Payment {
	return {
		id: 0, 
		cancellation_reason: null, 
		cancellation_timestamp: null, 
		cancelled_by_user_id: null, 
		change_amount: 0, 
		concept: null, 
		created_by_user_id: null, 
		created: new Date(), 
		currency_id: 'MXN', 
		exchange_rate: 0, 
		facturado: 'YES', 
		paid_by_user_id: null, 
		payment_amount: 0, 
		received_amount: 0, 
		sat_factura_id: null, 
		sat_pdf_attachment_id: null, 
		sat_uuid: null, 
		sat_xml_attachment_id: null, 
		status: 'ACTIVE', 
		store_id: null, 
		sync_id: null, 
		sync_uuid: null, 
		tag: null, 
		type: 'income', 
		updated: new Date(), 
	};
}
