export interface Stock_Record {
  id: number;
  created_by_user_id: number;
  created: string | Date;
  description: string | null;
  is_current: number | null;
  item_id: number;
  movement_qty: number | null;
  movement_type: string | null;
  order_item_id: number | null;
  previous_qty: number | null;
  production_item_id: number | null;
  purchase_detail_id: number | null;
  qty: number | null;
  serial_number_record_id: number | null;
  shipping_item_id: number | null;
  store_id: number;
  updated_by_user_id: number;
  updated: string;
}


