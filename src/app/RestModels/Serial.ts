export interface Serial {
  id: number;
  available_status: string | null;
  additional_data: string | null;
  created_by_user_id: number | null;
  created: string | Date;
  description: string | null;
  last_order_id: number | null;
  last_reservation_id: number | null;
  item_id: number;
  serial_number: string;
  status: string | null;
  store_id: number;
  updated_by_user_id: number | null;
  updated: string;
}


