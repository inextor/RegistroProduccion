export interface Ecommerce_User {
  id: number;
  ecommerce_id: number;
  user_id: number;
  created: string | Date;
  type: string | null;
  updated: string;
  created_by_user_id: number | null;
  updated_by_user_id: number | null;
}


