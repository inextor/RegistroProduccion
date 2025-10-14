import { Billing_Data } from '../RestModels/Billing_Data';

export function billing_data(): Billing_Data {
	return {
		id: 0, 
		address: null, 
		city: null, 
		created_by_user_id: null, 
		created: new Date(), 
		password: null, 
		porcentaje_ISR: 0, 
		precision: '', 
		razon_social: null, 
		regimen_capital: null, 
		regimen_fiscal: null, 
		remaining_credits: 0, 
		rfc: '', 
		state: null, 
		updated_by_user_id: null, 
		updated: new Date(), 
		usuario: null, 
		zipcode: null, 
	};
}
