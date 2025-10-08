export interface Purchase {
  id: number;
  created_by_user_id: number;
  created: string;
  order_id: number;
  provider_name: string;
  provider_user_id: number;
  status: string;
  stock_status: string;
  store_id: number;
  total: number;
  updated_by_user_id: number;
  updated: string;
  amount_paid: number;
  paid_timestamp: string;
}


