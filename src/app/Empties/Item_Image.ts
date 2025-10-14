import { Item_Image } from '../RestModels/Item_Image';

export function item_image(): Item_Image {
	return {
		id: 0, 
		created_by_user_id: 0, 
		created: new Date(), 
		image_id: 0, 
		item_id: 0, 
		updated_by_user_id: 0, 
		updated: new Date(), 
	};
}
