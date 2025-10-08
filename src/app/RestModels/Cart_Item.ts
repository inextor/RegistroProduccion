export interface Cart_Item {
  id: number;
  created: string | Date;
  item_id: number;
  qty: number;
  session_id: string | null;
  type: string | null;
  updated: string;
  user_id: number | null;
}


