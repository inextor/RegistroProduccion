export interface Order_Item {
  id: number;
  commanda_id: number | null;
  commanda_status: 'NOT_DISPLAYED' | 'PENDING' | 'DISMISSED' | 'NOT_DISPLAYED';
  created_by_user_id: number | null;
  created: string | Date;
  delivered_qty: number;
  delivery_status: 'PENDING' | 'DELIVERED' | 'PENDING';
  discount_percent: number;
  discount: number;
  exceptions: string | null;
  has_separator: 'NO' | 'YES' | 'NO';
  ieps_calculated: number;
  ieps_type: 'RATE' | 'AMOUNT' | 'RATE';
  ieps_value: number;
  id_payment: number | null;
  is_free_of_charge: 'NO' | 'YES' | 'NO';
  is_item_extra: 'NO' | 'YES';
  item_extra_id: number | null;
  item_group: any;
  item_id: number;
  item_option_id: number | null;
  item_option_qty: number;
  note: string | null;
  offer_id: number | null;
  order_id: number;
  original_unitary_price: number;
  paid_qty: number;
  preparation_status: 'PENDING' | 'IN_PREPARATION' | 'READY' | 'DELIVERED' | 'PENDING';
  price_id: number | null;
  qty: number;
  reservation_item_id: number | null;
  return_required: 'NO' | 'YES' | 'NO';
  status: 'ACTIVE' | 'DELETED' | 'ACTIVE';
  stock_status: 'IN_STOCK' | 'STOCK_REMOVED' | 'IN_STOCK' | 'STOCK_REMOVED deberia ser stock_processed';
  subtotal: number;
  system_preparation_ended: string | Date | null;
  system_preparation_started: string | Date | null;
  tax_included: 'NO' | 'YES' | 'NO';
  tax: number;
  total: number;
  type: 'NORMAL' | 'REFUND' | 'NORMAL' | 'Normal a normal item to be charge,\r\nREFUND a order item to be refunded, not to be delivered.\r\na refund item mus be a discount a the specified price o by another one. ';
  unitary_price_meta: number;
  unitary_price: number;
  updated_by_user_id: number | null;
  updated: string | Date;
}


