export interface Process {
  id: number;
  category_id: number | null;
  created: string | Date;
  generator_type: 'ON_DEMAN' | 'SALE_ITEM' | 'SALE_CATEGORY' | 'SALE_JSON_TAG';
  item_id: number | null;
  json_tags: any | null;
  name: string;
  production_area_id: number;
  status: 'ACTIVE' | 'DELETED' | 'ACTIVE';
  updated: string | Date;
}


