export interface Ingredient {
  id: number;
  created_by_user_id: number;
  created: string | Date;
  item_id: number;
  name: any;
  order_type: 'ALL' | 'TOGO' | 'IN_PLACE' | 'PICK_UP' | 'QUICK_SALE' | 'ALL';
  qty: number;
  stock_item_id: number;
  updated_by_user_id: number;
  updated: string | Date;
}


