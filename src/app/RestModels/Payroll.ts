export interface Payroll {
  id: number;
  created_by_user_id: number;
  created: string | Date;
  currency_id: string;
  end_date: string;
  paid_status: 'PENDING' | 'PAID' | 'PENDING';
  paid_timestamp: string | Date | null;
  start_date: string;
  status: 'ACTIVE' | 'DELETED' | 'ACTIVE';
  store_id: number;
  subtotal: number;
  total: number;
  updated_by_user_id: number;
  updated: string | Date;
  user_id: number;
}


