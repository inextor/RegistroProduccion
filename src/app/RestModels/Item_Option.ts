export interface Item_Option {
  id: number;
  included_extra_qty: number;
  included_options: number | null;
  item_id: number;
  max_extra_qty: number | null;
  max_options: number | null;
  min_options: number;
  min_selections: number;
  name: string;
  status: string | null;
}


