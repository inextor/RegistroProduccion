import { Category } from '../RestModels/Category';

export function category(): Category {
	return {
		id: 0, 
		available_online: 'YES', 
		background: '', 
		code: null, 
		created_by_user_id: null, 
		created: new Date(), 
		default_clave_prod_serv: null, 
		display_status: 'NORMAL', 
		image_id: null, 
		image_style: 'COVER', 
		name: '', 
		shadow_color: '', 
		sort_weight: 0, 
		text_color: '', 
		text_style: 'NEVER', 
		type: null, 
		updated_by_user_id: null, 
		updated: new Date(), 
	};
}
