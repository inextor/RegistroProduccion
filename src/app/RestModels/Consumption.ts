export interface Consumption {
  id: number;
  consumed: string;
  item_id: number;
  price: number | null;
  qty: number | null;
  production_area_id: number | null;
  consumed_by_user_id: number | null;
  store_id: number;
  description: string | null;
  status: string | null;
  created: string | Date;
  created_by_user_id: number;
  updated: string;
  updated_by_user_id: number;
}


