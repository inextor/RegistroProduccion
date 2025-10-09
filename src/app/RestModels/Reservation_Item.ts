export interface Reservation_Item {
  id: number;
  created: string | Date;
  delivered_qty: number;
  end: string | Date | null;
  item_id: number;
  last_period_id: number | null;
  note: string | null;
  period_type: 'BY_HOUR' | 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'ONCE_ONLY' | 'Se cobra cada que pasa X tiempe excepto si se especifica que es ONCE_ONLY';
  price: number;
  tax_included: 'YES' | 'NO' | 'YES';
  qty: number;
  reservation_id: number;
  returned_qty: number;
  scheduled_delivery: string | Date | null;
  scheduled_return: string | Date | null;
  stock_item_id: number;
  start: string | Date;
  status: 'ACTIVE' | 'DELETED' | 'ACTIVE';
  updated: string | Date;
}


