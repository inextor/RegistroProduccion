import { Store_Bank_Account } from '../RestModels/Store_Bank_Account';

export function store_bank_account(): Store_Bank_Account {
	return {
		id: 0, 
		bank_account_id: 0, 
		created: new Date(), 
		default_transaction_type: null, 
		name: '', 
		store_id: 0, 
		updated: new Date(), 
	};
}
