export interface Table {
  id: number;
  attended_by_user_id: number | null;
  capacity: number;
  clean_status: string | null;
  created_by_user_id: number | null;
  created: string | Date | null;
  is_dirty: string | null;
  name: string;
  order_id: number | null;
  ordered_status: string | null;
  status: string | null;
  store_id: number;
  updated_by_user_id: number | null;
  updated: string;
}


