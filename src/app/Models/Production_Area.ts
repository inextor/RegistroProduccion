export interface Production_Area {
  id: number;
  name: string;
  store_id: number;
  status: 'ACTIVE' | 'DELETED';
  created: string;
  created_by_user_id: number;
  updated: string;
  updated_by_user_id: number;
}
