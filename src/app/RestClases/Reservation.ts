export interface Reservation {
  id: number;
  address_id: number;
  client_name: string;
  created: string;
  created_by_user_id: number;
  condition: string;
  currency_id: string;
  note: string;
  price_type_id: number;
  start: string | Date;
  status: string;
  store_id: number;
  updated: string;
  updated_by_user_id: number;
  user_id: number;
}


