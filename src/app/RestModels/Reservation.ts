export interface Reservation {
  id: number;
  address_id: number | null;
  client_name: string;
  created: string | Date;
  created_by_user_id: number;
  condition: string | null;
  currency_id: string;
  note: string | null;
  price_type_id: number;
  start: string;
  status: string | null;
  store_id: number;
  updated: string;
  updated_by_user_id: number;
  user_id: number | null;
}


