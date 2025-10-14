import { Album_Image } from '../RestModels/Album_Image';

export function album_image(): Album_Image {
	return {
		id: 0, 
		album_id: null, 
		image_id: null, 
		created: null, 
		created_by_user_id: 0, 
		description: null, 
		item_id: null, 
		title: null, 
		updated: null, 
		updated_by_user_id: 0, 
	};
}
