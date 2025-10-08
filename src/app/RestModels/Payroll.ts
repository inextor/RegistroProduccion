export interface Payroll {
  id: number;
  created_by_user_id: number;
  created: string;
  end_date: string | Date;
  paid_status: string;
  paid_timestamp: string;
  start_date: string | Date;
  status: string;
  store_id: number;
  subtotal: number;
  total: number;
  updated_by_user_id: number;
  updated: string;
  user_id: number;
}


