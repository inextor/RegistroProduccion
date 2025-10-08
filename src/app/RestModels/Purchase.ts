export interface Purchase {
  id: number;
  created_by_user_id: number | null;
  created: string | Date;
  order_id: number | null;
  provider_name: string | null;
  provider_user_id: number | null;
  status: string | null;
  stock_status: string | null;
  store_id: number;
  total: number | null;
  updated_by_user_id: number | null;
  updated: string;
  amount_paid: number | null;
  paid_timestamp: string | Date | null;
}


