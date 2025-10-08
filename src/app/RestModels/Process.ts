export interface Process {
  id: number;
  category_id: number | null;
  created: string | Date;
  generator_type: string | null;
  item_id: number | null;
  json_tags: string | null;
  name: string;
  production_area_id: number;
  status: string | null;
  updated: string;
}


