import { Ledger_Category } from '../RestModels/Ledger_Category';

export function ledger_category(): Ledger_Category {
	return {
		id: 0, 
		created: new Date(), 
		created_by_user_id: 0, 
		description: null, 
		name: '', 
		updated: new Date(), 
		updated_by_user_id: 0, 
	};
}
