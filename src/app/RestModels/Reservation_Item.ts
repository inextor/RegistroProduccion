export interface Reservation_Item {
  id: number;
  created: string | Date;
  delivered_qty: number;
  end: string | null;
  item_id: number;
  last_period_id: number | null;
  note: string | null;
  period_type: string | null;
  price: number | null;
  tax_included: string | null;
  qty: number;
  reservation_id: number;
  returned_qty: number;
  scheduled_delivery: string | null;
  scheduled_return: string | null;
  stock_item_id: number;
  start: string;
  status: string | null;
  updated: string;
}


