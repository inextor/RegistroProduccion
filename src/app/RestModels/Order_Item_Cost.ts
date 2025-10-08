export interface Order_Item_Cost {
  id: number;
  child_items_cost: number | null;
  cost: number | null;
  created: string | Date;
  ingredients_cost: number | null;
  item_cost: number | null;
  item_id: number;
  name: string;
  order_id: number;
  order_item_id: number;
  qty: number | null;
  sale_profit: number | null;
  sale_total: number | null;
  store_id: number;
  total: number | null;
}


