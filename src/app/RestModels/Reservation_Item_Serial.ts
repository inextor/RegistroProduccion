export interface Reservation_Item_Serial {
  id: number;
  created: string | Date;
  delivered_qty: number;
  created_by_user_id: number;
  delivered_timestamp: string | Date | null;
  delivery_by_user_id: number | null;
  end: string | null;
  minutes_offset: number;
  note: string | null;
  reservation_item_id: number;
  returned_qty: number;
  returned_timestamp: string | Date | null;
  returned_by_user_id: number | null;
  schedule_delivery: string | null;
  schedule_return: string | null;
  serial_id: number;
  serial: string | null;
  start: string | null;
  status: string | null;
  updated: string;
  updated_by_user_id: number;
}


