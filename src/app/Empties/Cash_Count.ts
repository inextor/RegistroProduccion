import { Cash_Count } from '../RestModels/Cash_Count';

export function cash_count(): Cash_Count {
	return {
		id: 0, 
		cash_close_id: 0, 
		currency_id: 'MXN', 
		denomination: 0, 
		quantity: 0, 
		type: 'COIN', 
		created: null, 
		updated: null, 
		only_reference: '', 
	};
}
