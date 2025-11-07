import { Consumption_User } from '../RestModels/Consumption_User';

export function consumption_user(): Consumption_User {
	return {
		id: 0,
		created_by_user_id: 0,
		created: new Date(),
		currency_id: 'MXN',
		price: 0,
		consumption_id: 0,
		total: 0,
		updated_by_user_id: 0,
		updated: new Date(),
		user_id: 0,
		account_id: null,
	};
}
