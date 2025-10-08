export interface Consumption_User {
  id: number;
  created_by_user_id: number;
  created: string | Date;
  currency_id: string;
  price: number | null;
  consumption_id: number;
  total: number | null;
  updated_by_user_id: number;
  updated: string;
  user_id: number;
}


