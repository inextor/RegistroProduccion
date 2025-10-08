export interface Stocktake_Scan {
  id: number;
  stocktake_id: number;
  pallet_id: number;
  box_id: number;
  box_content_id: number;
  item_id: number;
  qty: number;
  created_by_user_id: number;
  updated_by_user_id: number;
  created: string;
  updated: string;
}


