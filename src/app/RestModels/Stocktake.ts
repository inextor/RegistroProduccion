export interface Stocktake {
  id: number;
  created_by_user_id: number | null;
  created: string | Date;
  name: string | null;
  status: string | null;
  stock_adjustment: string | null;
  store_id: number;
  updated_by_user_id: number | null;
  updated: string;
}


