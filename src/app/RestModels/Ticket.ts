export interface Ticket {
  id: number;
  created: string | Date;
  created_by_user_id: number;
  exceptions_display: string | null;
  footer: string | null;
  header: string | null;
  item_money_sign_display: string | null;
  item_name_display: string | null;
  item_note_display: string | null;
  item_price_display: string | null;
  item_qty1_display: string | null;
  item_qty2_display: string | null;
  item_qty_times_price_display: string | null;
  item_subtotal_display: string | null;
  item_total_display: string | null;
  name: string;
  option_item_display: string | null;
  option_price_display: string | null;
  option_qty_by_item: string | null;
  option_row_display: string | null;
  option_total_qty: string | null;
  option_total_qty_times_price: string | null;
  order_note_display: string | null;
  updated: string;
  updated_by_user_id: number;
}


