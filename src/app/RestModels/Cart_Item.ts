export interface Cart_Item {
  id: number;
  created: string | Date;
  item_id: number;
  qty: number;
  session_id: string | null;
  type: 'IN_CART' | 'BUY_LATER' | 'IN_CART';
  updated: string | Date;
  user_id: number | null;
}


