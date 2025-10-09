export interface Stocktake_Item {
  id: number;
  box_content_id: number | null;
  box_id: number | null;
  created_by_user_id: number | null;
  created: string | Date;
  db_qty: number;
  item_id: number;
  pallet_id: number | null;
  real_qty: number;
  stocktake_id: number;
  updated_by_user_id: number | null;
  updated: string | Date;
}


