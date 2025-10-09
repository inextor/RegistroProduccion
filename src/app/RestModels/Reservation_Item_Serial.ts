export interface Reservation_Item_Serial {
  id: number;
  created: string | Date;
  delivered_qty: number;
  created_by_user_id: number;
  delivered_timestamp: string | Date | null;
  delivery_by_user_id: number | null;
  end: string | Date | null;
  minutes_offset: number;
  note: string | null;
  reservation_item_id: number;
  returned_qty: number;
  returned_timestamp: string | Date | null;
  returned_by_user_id: number | null;
  schedule_delivery: string | Date | null;
  schedule_return: string | Date | null;
  serial_id: number;
  serial: string | null;
  start: string | Date | null;
  status: 'ACTIVE' | 'DELETED' | 'ACTIVE';
  updated: string | Date;
  updated_by_user_id: number;
}


