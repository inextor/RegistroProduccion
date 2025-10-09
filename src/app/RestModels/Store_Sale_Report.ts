export interface Store_Sale_Report {
  id: number;
  amount_description: string;
  ares_order_ids: string;
  average_order_amount: number;
  created_by_user_id: number;
  created: string | Date;
  date: string | null;
  discounts: number;
  end_timestamp: string | Date;
  expense_payments: number;
  income_payments: number;
  localtime_end: string | Date;
  localtime_start: string | Date;
  order_count: number;
  order_ids: string;
  start_timestamp: string | Date;
  store_consecutive: number;
  store_id: number;
  total_sales: number;
  updated_by_user_id: number;
  updated: string | Date;
}


