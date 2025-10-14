import { Bank_Account } from '../RestModels/Bank_Account';

export function bank_account(): Bank_Account {
	return {
		id: 0, 
		account: '', 
		alias: '', 
		bank_rfc: null, 
		bank: '', 
		created: new Date(), 
		currency: '', 
		email: null, 
		is_a_payment_method: 'NO', 
		name: '', 
		updated: new Date(), 
		user_id: null, 
	};
}
