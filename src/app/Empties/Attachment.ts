import { Attachment } from '../RestModels/Attachment';

export function attachment(): Attachment {
	return {
		id: 0, 
		content_type: '', 
		created: new Date(), 
		file_type_id: null, 
		filename: null, 
		height: null, 
		original_filename: '', 
		size: '', 
		status: 'ACTIVE', 
		updated: new Date(), 
		uploader_user_id: null, 
		width: null, 
	};
}
