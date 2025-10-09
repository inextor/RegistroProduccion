export interface Order_Item_Exception {
  id: number;
  created: string | Date;
  description: string;
  item_exception_id: number;
  order_item_id: number;
  stock_item_id: number | null;
  updated: string | Date;
}


