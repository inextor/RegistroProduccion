import { Ledger_Detail } from '../RestModels/Ledger_Detail';

export function ledger_detail(): Ledger_Detail {
	return {
		id: 0, 
		ledger_id: 0, 
		item_id: 0, 
		description: null, 
		qty: 0, 
		unitary_price: 0, 
		line_total: 0, 
		created: new Date(), 
		created_by_user_id: 0, 
		updated: new Date(), 
		updated_by_user_id: 0, 
	};
}
