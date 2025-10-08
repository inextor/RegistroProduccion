export interface Order_Item {
  id: number;
  commanda_id: number | null;
  commanda_status: string | null;
  created_by_user_id: number | null;
  created: string | Date;
  delivered_qty: number | null;
  delivery_status: string | null;
  discount_percent: number;
  discount: number | null;
  exceptions: string | null;
  has_separator: string | null;
  ieps_calculated: number | null;
  ieps_type: string | null;
  ieps_value: number | null;
  id_payment: number | null;
  is_free_of_charge: string | null;
  is_item_extra: string | null;
  item_extra_id: number | null;
  item_group: number;
  item_id: number;
  item_option_id: number | null;
  item_option_qty: number;
  note: string | null;
  offer_id: number | null;
  order_id: number;
  original_unitary_price: number | null;
  paid_qty: number;
  preparation_status: string | null;
  price_id: number | null;
  qty: number | null;
  reservation_item_id: number | null;
  return_required: string | null;
  status: string | null;
  stock_status: string | null;
  subtotal: number | null;
  system_preparation_ended: string | Date | null;
  system_preparation_started: string | Date | null;
  tax_included: string | null;
  tax: number | null;
  total: number | null;
  type: string | null;
  unitary_price_meta: number | null;
  unitary_price: number | null;
  updated_by_user_id: number | null;
  updated: string;
}


