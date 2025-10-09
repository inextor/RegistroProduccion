export interface Storage {
  id: number;
  created_by_user_id: number;
  created: string | Date;
  level: number;
  name: string | null;
  parent_storage_id: number | null;
  store_id: number;
  storage_type_id: number;
  updated_by_user_id: number;
  updated: string | Date;
}


