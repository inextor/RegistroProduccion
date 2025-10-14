import { Purchase_Detail } from '../RestModels/Purchase_Detail';

export function purchase_detail(): Purchase_Detail {
	return {
		id: 0, 
		created: new Date(), 
		description: null, 
		item_id: 0, 
		purchase_id: 0, 
		qty: 0, 
		serial_number: null, 
		status: 'ACTIVE', 
		stock_status: 'PENDING', 
		total: 0, 
		unitary_price: 0, 
		updated: new Date(), 
	};
}
