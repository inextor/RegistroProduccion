import { Printer } from '../RestModels/Printer';

export function printer(): Printer {
	return {
		id: 0, 
		created_by_user_id: 0, 
		created: new Date(), 
		description: 0, 
		device: null, 
		ip_address: null, 
		name: '', 
		port: null, 
		protocol: '', 
		store_id: null, 
		updated_by_user_id: 0, 
		updated: new Date(), 
	};
}
