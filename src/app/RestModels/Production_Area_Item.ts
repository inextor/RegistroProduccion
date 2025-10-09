export interface Production_Area_Item {
  id: number;
  created: string | Date;
  item_id: number;
  production_area_id: number;
  status: 'ACTIVE' | 'DELETED' | 'ACTIVE';
  updated: string | Date;
}


