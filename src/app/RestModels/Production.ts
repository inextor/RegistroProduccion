export interface Production {
  id: number;
  alternate_qty: number;
  batch: string | null;
  control: string | null;
  created_by_user_id: number | null;
  created: string | Date;
  item_id: number;
  merma_qty: number;
  merma_reason: string | null;
  produced: string | Date;
  produced_by_user_id: number | null;
  production_area_id: number;
  qty_reported: number;
  qty: number;
  status: 'ACTIVE' | 'DELETED' | 'ACTIVE';
  store_id: number;
  updated: string | Date;
  verified_by_user_id: number | null;
}


