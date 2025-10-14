import { Ecommerce } from '../RestModels/Ecommerce';

export function ecommerce(): Ecommerce {
	return {
		id: 0, 
		banner_image_id: null, 
		created: new Date(), 
		font_color: null, 
		name: '', 
		color: '', 
		store_id: null, 
		price_list_id: 0, 
		price_type_id: 0, 
		updated: new Date(), 
		logo_image_id: null, 
		preferences_id: 0, 
	};
}
