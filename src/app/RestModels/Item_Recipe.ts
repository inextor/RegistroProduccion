export interface Item_Recipe {
  id: number;
  created: string | Date;
  item_id: number;
  parent_item_id: number;
  portion_qty: number | null;
  print_on_recipe: string | null;
  updated: string;
}


