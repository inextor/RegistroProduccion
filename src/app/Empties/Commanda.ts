import { Commanda } from '../RestModels/Commanda';

export function commanda(): Commanda {
	return {
		id: 0, 
		commanda_type_id: 0, 
		has_sound: '', 
		name: '', 
		order_display_preferences: 'ALL_ORDERS', 
		print_preferences: 'ONLY_DISPLAY', 
		printer_ip: null, 
		printer_port: null, 
		store_id: 0, 
	};
}
