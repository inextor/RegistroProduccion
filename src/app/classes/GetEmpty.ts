import { Payroll } from "../Models/Payroll";
import { Payroll_Value } from "../Models/Payroll_Value";
import { User } from "../Models/User";
import { Production_Area } from "../RestModels";

export interface PayrollInfo
{
	values: Payroll_Value[];
	user: User;
	payroll:Payroll;
}


export class GetEmpty
{
    static production_area(): Production_Area {
		return {
			id: 0,
  			created: new Date(),
  			name: '',
  			status: 'ACTIVE',
  			store_id: 0,
  			updated: new Date()
		} as Production_Area;
    }

	static payroll_info():PayrollInfo
	{
		return {
			payroll: {
				id: 0,
				store_id: 1,
				start_date: '',
				end_date: '',
				paid_timestamp: null,
				user_id: 0,
				status: 'ACTIVE',
				created: new Date().toISOString().slice(0, 19).replace('T', ' '),
				paid_status: 'PENDING',
				subtotal: 0,
				total: 0
			},
			values: [],
			user:{
				created: new Date().toISOString(),
				created_by_user_id: null,
				credit_days: null,
				credit_limit: 0,
				default_billing_address_id: null,
				default_shipping_address_id: null,
				email: null,
				id: 0,
				image_id: null,
				lat: null,
				lng: null,
				name: '',
				password: null,
				phone: null,
				platform_client_id: null,
				points: 0,
				price_type_id: null,
				production_area_id: null,
				status: 'ACTIVE',
				store_id: null,
				type: 'CLIENT',
				updated: new Date().toISOString(),
				updated_by_user_id: null,
				username: null,
				workshift_id: null
			}
		};
	}
}
