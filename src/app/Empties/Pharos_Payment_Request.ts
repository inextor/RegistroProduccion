import { Pharos_Payment_Request } from '../RestModels/Pharos_Payment_Request';

export function pharos_payment_request(): Pharos_Payment_Request {
	return {
		id: 0, 
		pharos_credentials_id: 0, 
		created_by_user_id: 0, 
		amount: 0, 
		created: new Date(), 
		currency_id: 'MXN', 
		merchant_code: '', 
		order_id: null, 
		terminal_code: '', 
		transaction_uuid: '', 
		response: null, 
		updated_by_user_id: 0, 
		updated: new Date(), 
	};
}
