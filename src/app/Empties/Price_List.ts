import { Price_List } from '../RestModels/Price_List';

export function price_list(): Price_List {
	return {
		id: 0, 
		created_by_user_id: null, 
		created: new Date(), 
		name: '', 
		updated_by_user_id: null, 
		updated: new Date(), 
	};
}
