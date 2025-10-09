export interface Production_User {
  id: number;
  production_id: number;
  user_id: number;
  price: number;
  currency_id: string;
  created: string | Date;
  updated: string | Date;
  created_by_user_id: number;
  updated_by_user_id: number;
}


