export interface Production {
  id: number;
  alternate_qty: number | null;
  batch: string | null;
  control: string | null;
  created_by_user_id: number | null;
  created: string | Date;
  item_id: number;
  merma_qty: number | null;
  merma_reason: string | null;
  produced: string;
  produced_by_user_id: number | null;
  production_area_id: number;
  qty_reported: number | null;
  qty: number | null;
  status: string | null;
  store_id: number;
  updated: string;
  verified_by_user_id: number | null;
}


