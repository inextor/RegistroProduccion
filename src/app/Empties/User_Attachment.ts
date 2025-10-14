import { User_Attachment } from '../RestModels/User_Attachment';

export function user_attachment(): User_Attachment {
	return {
		id: 0, 
		alias: '', 
		attachment_id: 0, 
		created_by_user_id: 0, 
		created: new Date(), 
		status: 'ACTIVE', 
		updated_by_user_id: 0, 
		updated: new Date(), 
		user_id: 0, 
	};
}
