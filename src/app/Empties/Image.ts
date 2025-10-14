import { Image } from '../RestModels/Image';

export function image(): Image {
	return {
		id: 0, 
		content_type: '', 
		created: new Date(), 
		filename: '', 
		height: 0, 
		is_private: '', 
		original_filename: null, 
		size: 0, 
		uploader_user_id: null, 
		width: 0, 
	};
}
