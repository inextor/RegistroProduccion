import { Payroll } from "../Models/Payroll";
import { Payroll_Value } from "../Models/Payroll_Value";
import { User } from "../Models/User";

export interface PayrollInfo
{
	values: Payroll_Value[];
	user: User;
	payroll:Payroll;
}


export class GetEmpty
{
	static store():any
	{
		return {
			address:'',
			accept_cash: 1,
			accept_check: 1,
			accept_credit_card: 1,
			accept_transfer: 1,
			accept_delivery_orders: 'NEVER',
			accept_pickup_orders: 'NEVER',
			autofacturacion_enabled: 'NO',
			business_name:'',
			city:'',
			lat: null,
			lng: null,
			client_user_id:null,
			created: new Date(),
			code: null,
			qr_size: 'PERCENT_100',
			created_by_user_id: null,
			default_billing_data_id: null,
			default_currency_id:'MXN',
			default_claveprodserv: '',
			default_sat_item_name: '',
			default_sat_serie: 'A',
			electronic_transfer_percent_fee: 0,
			autofacturacion_settings: 'DISABLED',
			autofacturacion_day_limit: 7,
			main_pc_ip:null,
			modo_facturacion: 'DESGLOSADA',
			id: 0,
			image_id: null,
			name:'',
			offline_search_enabled: 0,
			max_cash_amount:0,
			paypal_email: '',
			phone:'',
			pos_category_preferences:'DEFAULT_BY_PRODUCT',
			price_list_id: 1,
			printer_ticket_config:'',
			print_receipt_copies: 1,
			production_enabled: 0,
			rfc:'',
			sales_enabled: 1,
			show_facturacion_qr: 'NO',
			state:'',
			status:'DISABLED',
			suggested_tip: 0,
			tax_percent: 16,
			ticket_footer_text:'',
			ticket_image_id:null,
			updated: new Date(),
			updated_by_user_id : null,
			zipcode: ''
		}
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
