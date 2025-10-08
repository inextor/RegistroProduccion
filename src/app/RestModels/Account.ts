export interface Account {
  id: number;
  status: string | null;
  balance: number | null;
  created: string | Date;
  created_by_user_id: number;
  currency_id: string;
  is_main: number | null;
  updated: string;
  updated_by_user_id: number;
  user_id: number;
}


