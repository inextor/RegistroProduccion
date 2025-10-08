export interface Payroll {
  id: number;
  created_by_user_id: number;
  created: string | Date;
  end_date: string;
  paid_status: string | null;
  paid_timestamp: string | Date | null;
  start_date: string;
  status: string | null;
  store_id: number;
  subtotal: number | null;
  total: number | null;
  updated_by_user_id: number;
  updated: string;
  user_id: number;
}


