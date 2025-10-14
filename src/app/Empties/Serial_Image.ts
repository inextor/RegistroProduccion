import { Serial_Image } from '../RestModels/Serial_Image';

export function serial_image(): Serial_Image {
	return {
		id: 0, 
		created: new Date(), 
		description: null, 
		image_id: 0, 
		serial_id: 0, 
		updated: new Date(), 
	};
}
