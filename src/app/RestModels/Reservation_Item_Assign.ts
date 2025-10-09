export interface Reservation_Item_Assign {
  id: number;
  created_by_user_id: number;
  created: string | Date;
  reservation_item_id: number;
  type: 'DELIVERY' | 'COLLECT';
  updated_by_user_id: number;
  updated: string | Date;
  user_id: number;
}


