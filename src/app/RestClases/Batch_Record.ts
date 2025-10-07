export interface Batch_Record {
  id: number;
  created_by_user_id: number;
  created: string;
  description: string;
  is_current: number;
  item_id: number;
  batch: string;
  expiration_date: string | Date;
  movement_qty: number;
  movement_type: string;
  order_item_id: number;
  previous_qty: number;
  production_item_id: number;
  purchase_detail_id: number;
  qty: number;
  shipping_item_id: number;
  store_id: number;
  stock_record_id: number;
  updated_by_user_id: number;
  updated: string;
}


