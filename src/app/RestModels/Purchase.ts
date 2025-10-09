export interface Purchase {
  id: number;
  created_by_user_id: number | null;
  created: string | Date;
  order_id: number | null;
  provider_name: string | null;
  provider_user_id: number | null;
  status: 'ACTIVE' | 'DELETED' | 'ACTIVE';
  stock_status: 'PENDING' | 'ADDED_TO_STOCK' | 'SHIPPING_CREATED' | 'PENDING';
  store_id: number;
  total: number;
  updated_by_user_id: number | null;
  updated: string | Date;
  amount_paid: number;
  paid_timestamp: string | Date | null;
}


