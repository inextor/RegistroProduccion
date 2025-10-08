export interface Reservation_Item_Serial {
  id: number;
  created: string;
  delivered_qty: number;
  created_by_user_id: number;
  delivered_timestamp: string;
  delivery_by_user_id: number;
  end: string | Date;
  minutes_offset: number;
  note: string;
  reservation_item_id: number;
  returned_qty: number;
  returned_timestamp: string;
  returned_by_user_id: number;
  schedule_delivery: string | Date;
  schedule_return: string | Date;
  serial_id: number;
  serial: string;
  start: string | Date;
  status: string;
  updated: string;
  updated_by_user_id: number;
}


