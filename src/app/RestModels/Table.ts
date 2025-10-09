export interface Table {
  id: number;
  attended_by_user_id: number | null;
  capacity: number;
  clean_status: 'CLEAN' | 'NEED_CLEANING';
  created_by_user_id: number | null;
  created: string | Date | null;
  is_dirty: 'NO' | 'YES' | 'NO';
  name: string;
  order_id: number | null;
  ordered_status: 'PENDING' | 'ORDERED';
  status: 'ACTIVE' | 'DELETED';
  store_id: number;
  updated_by_user_id: number | null;
  updated: string | Date;
}


