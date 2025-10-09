export interface Consumption {
  id: number;
  consumed: string | Date;
  item_id: number;
  price: number;
  qty: number;
  production_area_id: number | null;
  consumed_by_user_id: number | null;
  store_id: number;
  description: string | null;
  status: 'ACTIVE' | 'DELETED' | 'ACTIVE';
  created: string | Date;
  created_by_user_id: number;
  updated: string | Date;
  updated_by_user_id: number;
}


