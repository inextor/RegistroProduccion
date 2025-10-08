export interface Box {
  id: number;
  created: string | Date;
  production_item_id: number | null;
  serial_number_range_end: number | null;
  serial_number_range_start: number | null;
  status: string | null;
  store_id: number | null;
  type_item_id: number;
  updated: string;
}


