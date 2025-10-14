import { Cashier_Withdrawal } from '../RestModels/Cashier_Withdrawal';

export function cashier_withdrawal(): Cashier_Withdrawal {
	return {
		id: 0, 
		amount: 0, 
		created: new Date(), 
		currency_id: 'MXN', 
		store_id: 0, 
		user_id: 0, 
	};
}
