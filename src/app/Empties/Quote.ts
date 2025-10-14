import { Quote } from '../RestModels/Quote';

export function quote(): Quote {
	return {
		approved_status: 'PENDING', 
		approved_time: null, 
		attachment_id: null, 
		client_user_id: null, 
		created_by_user_id: 0, 
		created: new Date(), 
		currency_id: 'MXN', 
		email: '', 
		id: 0, 
		name: '', 
		note: null, 
		phone: '', 
		price_type_id: null, 
		sent_timestamp: null, 
		store_id: 0, 
		sync_id: '', 
		tax_percent: 0, 
		updated: new Date(), 
		valid_until: null, 
	};
}
