import { Pallet_Content } from '../RestModels/Pallet_Content';

export function pallet_content(): Pallet_Content {
	return {
		id: 0, 
		pallet_id: 0, 
		box_id: 0, 
		status: 'ACTIVE', 
		created_by_user_id: null, 
		updated_by_user_id: null, 
		created: new Date(), 
		updated: new Date(), 
	};
}
