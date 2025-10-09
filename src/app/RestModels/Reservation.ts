export interface Reservation {
  id: number;
  address_id: number | null;
  client_name: string;
  created: string | Date;
  created_by_user_id: number;
  condition: 'DRAFT' | 'ACTIVE' | 'CLOSED' | 'ACTIVE';
  currency_id: string;
  note: string | null;
  price_type_id: number;
  start: string | Date;
  status: 'ACTIVE' | 'DELETED' | 'ACTIVE';
  store_id: number;
  updated: string | Date;
  updated_by_user_id: number;
  user_id: number | null;
}


