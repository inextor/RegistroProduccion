import { Requisition_Item } from '../RestModels/Requisition_Item';

export function requisition_item(): Requisition_Item {
	return {
		aproved_status: 'NOT_APPROVED', 
		created: new Date(), 
		id: 0, 
		item_id: 0, 
		qty: 0, 
		requisition_id: 0, 
		status: 'ACTIVE', 
		updated: new Date(), 
	};
}
