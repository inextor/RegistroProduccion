export interface Ingredient {
  id: number;
  created_by_user_id: number;
  created: string | Date;
  item_id: number;
  name: string;
  order_type: string | null;
  qty: number | null;
  stock_item_id: number;
  updated_by_user_id: number;
  updated: string;
}


