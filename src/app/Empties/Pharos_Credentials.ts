import { Pharos_Credentials } from '../RestModels/Pharos_Credentials';

export function pharos_credentials(): Pharos_Credentials {
	return {
		id: 0, 
		created_by_user_id: 0, 
		created: new Date(), 
		endpoint: '', 
		name: '', 
		password: '', 
		merchant_code: '', 
		terminal_code: '', 
		updated_by_user_id: 0, 
		updated: new Date(), 
		user: '', 
	};
}
