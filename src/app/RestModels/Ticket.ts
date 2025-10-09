export interface Ticket {
  id: number;
  created: string | Date;
  created_by_user_id: number;
  exceptions_display: 'NEVER' | 'ONLY_IF_PRESENT' | 'NEVER';
  footer: string | null;
  header: string | null;
  item_money_sign_display: 'NEVER' | 'ALWAYS' | 'ONLY_IF_HAS_PRICE' | 'ALWAYS';
  item_name_display: 'TRUNCATED' | 'FULL' | 'FULL';
  item_note_display: 'NEVER' | 'ALWAYS' | 'NEVER';
  item_price_display: 'NEVER' | 'ONLY_IF_HAS_PRICE' | 'ALWAYS' | 'ALWAYS';
  item_qty1_display: 'NEVER' | 'ALWAYS' | 'ONLY_IF_HAS_PRICE' | 'ALWAYS';
  item_qty2_display: 'NEVER' | 'ALWAYS' | 'ONLY_IF_HAS_PRICE' | 'NEVER';
  item_qty_times_price_display: 'NEVER' | 'ONLY_IF_HAS_PRICE' | 'ALWAYS' | 'NEVER';
  item_subtotal_display: 'NEVER' | 'ONLY_IF_HAS_PRICE' | 'ALWAYS' | 'ALWAYS';
  item_total_display: 'ALWAYS' | 'ONLY_IF_HAS_PRICE' | 'ALWAYS';
  name: string;
  option_item_display: 'NEVER' | 'ALWAYS' | 'ONLY_IF_HAS_PRICE' | 'NEVER';
  option_price_display: 'NEVER' | 'ONLY_IF_HAS_PRICE' | 'ALWAYS' | 'NEVER';
  option_qty_by_item: 'NEVER' | 'ALWAYS' | 'ONLY_IF_HAS_PRICE' | 'NEVER';
  option_row_display: 'NEVER' | 'ONLY_IF_HAS_PRICE' | 'ALWAYS' | 'NEVER';
  option_total_qty: 'NEVER' | 'ONLY_IF_HAS_PRICE' | 'ALWAYS' | 'NEVER';
  option_total_qty_times_price: 'NEVER' | 'ONLY_IF_HAS_PRICE' | 'ALWAYS' | 'NEVER';
  order_note_display: 'ALWAYS' | 'NEVER' | 'NEVER';
  updated: string | Date;
  updated_by_user_id: number;
}


