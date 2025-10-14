import { Item_Attachment } from '../RestModels/Item_Attachment';

export function item_attachment(): Item_Attachment {
	return {
		id: 0, 
		attachment_id: 0, 
		created_by_user_id: 0, 
		created: new Date(), 
		description: null, 
		item_id: 0, 
		title: '', 
		updated_by_user_id: 0, 
		updated: new Date(), 
	};
}
