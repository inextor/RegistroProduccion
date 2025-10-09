export interface Pallet_Content {
  id: number;
  pallet_id: number;
  box_id: number;
  status: 'ACTIVE' | 'REMOVED' | 'ACTIVE';
  created_by_user_id: number | null;
  updated_by_user_id: number | null;
  created: string | Date;
  updated: string | Date;
}


