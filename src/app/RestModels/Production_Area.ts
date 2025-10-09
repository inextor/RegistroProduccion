export interface Production_Area {
  id: number;
  created: string | Date;
  name: string;
  status: 'ACTIVE' | 'DELETED' | 'ACTIVE';
  store_id: number;
  updated: string | Date;
}


