export interface Consumption {
  id: number;
  consumed: string | Date;
  item_id: number;
  price: number;
  qty: number;
  production_area_id: number;
  consumed_by_user_id: number;
  store_id: number;
  description: string;
  status: string;
  created: string;
  created_by_user_id: number;
  updated: string;
  updated_by_user_id: number;
}


