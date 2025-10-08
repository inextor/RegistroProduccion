export interface Points_Log {
  id: number;
  client_user_id: number;
  created_by_user_id: number | null;
  created: string | Date;
  item_id: number;
  order_id: number;
  points: number | null;
  updated: string;
}


