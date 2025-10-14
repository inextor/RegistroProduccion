import { File_Type } from '../RestModels/File_Type';

export function file_type(): File_Type {
	return {
		id: 0, 
		content_type: '', 
		created: new Date(), 
		extension: null, 
		image_id: null, 
		is_image: 'NO', 
		name: '', 
		updated: new Date(), 
	};
}
