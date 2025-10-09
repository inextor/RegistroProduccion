export interface Stocktake {
  id: number;
  created_by_user_id: number | null;
  created: string | Date;
  name: string | null;
  status: 'ACTIVE' | 'CLOSED';
  stock_adjustment: 'DIFFERENCE' | 'EXACT_QTY' | 'DIFFERENCE';
  store_id: number;
  updated_by_user_id: number | null;
  updated: string | Date;
}


