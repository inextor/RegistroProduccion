export interface Batch_Record {
  id: number;
  created_by_user_id: number;
  created: string | Date;
  description: string | null;
  is_current: any | null;
  item_id: number;
  batch: string;
  expiration_date: string | null;
  movement_qty: number;
  movement_type: 'POSITIVE' | 'NEGATIVE' | 'ADJUSTMENT';
  order_item_id: number | null;
  previous_qty: number;
  production_item_id: number | null;
  purchase_detail_id: number | null;
  qty: number;
  shipping_item_id: number | null;
  store_id: number;
  stock_record_id: number | null;
  updated_by_user_id: number;
  updated: string | Date;
}


