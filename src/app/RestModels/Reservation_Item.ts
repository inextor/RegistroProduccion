export interface Reservation_Item {
  id: number;
  created: string;
  delivered_qty: number;
  end: string | Date;
  item_id: number;
  last_period_id: number;
  note: string;
  period_type: string;
  price: number;
  tax_included: string;
  qty: number;
  reservation_id: number;
  returned_qty: number;
  scheduled_delivery: string | Date;
  scheduled_return: string | Date;
  stock_item_id: number;
  start: string | Date;
  status: string;
  updated: string;
}


