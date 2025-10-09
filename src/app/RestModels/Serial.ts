export interface Serial {
  id: number;
  available_status: 'AVAILABLE' | 'RESERVED' | 'MAINTENANCE' | 'AVAILABLE';
  additional_data: string | null;
  created_by_user_id: number | null;
  created: string | Date;
  description: string | null;
  last_order_id: number | null;
  last_reservation_id: number | null;
  item_id: number;
  serial_number: string;
  status: 'ACTIVE' | 'INACTIVE';
  store_id: number;
  updated_by_user_id: number | null;
  updated: string | Date;
}


