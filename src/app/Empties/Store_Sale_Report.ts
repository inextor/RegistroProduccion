import { Store_Sale_Report } from '../RestModels/Store_Sale_Report';

export function store_sale_report(): Store_Sale_Report {
	return {
		id: 0, 
		amount_description: '', 
		ares_order_ids: '', 
		average_order_amount: 0, 
		created_by_user_id: 0, 
		created: new Date(), 
		date: null, 
		discounts: 0, 
		end_timestamp: new Date(), 
		expense_payments: 0, 
		income_payments: 0, 
		localtime_end: new Date(), 
		localtime_start: new Date(), 
		order_count: 0, 
		order_ids: '', 
		start_timestamp: new Date(), 
		store_consecutive: 0, 
		store_id: 0, 
		total_sales: 0, 
		updated_by_user_id: 0, 
		updated: new Date(), 
	};
}
