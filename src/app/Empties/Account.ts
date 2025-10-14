import { Account } from '../RestModels/Account';

export function account(): Account {
	return {
		id: 0, 
		status: 'DELETED', 
		balance: 0, 
		created: new Date(), 
		created_by_user_id: 0, 
		currency_id: 'MXN', 
		is_main: null, 
		updated: new Date(), 
		updated_by_user_id: 0, 
		user_id: 0, 
	};
}
