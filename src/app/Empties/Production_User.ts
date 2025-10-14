import { Production_User } from '../RestModels/Production_User';

export function production_user(): Production_User {
	return {
		id: 0,
		production_id: 0,
		user_id: 0,
		price: 0,
		currency_id: 'MXN',
		created: new Date(),
		updated: new Date(),
		created_by_user_id: 0,
		updated_by_user_id: 0,
	};
}
