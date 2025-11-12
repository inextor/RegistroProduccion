export interface Account {
  id: number;
  status: 'DELETED' | 'ACTIVE' | 'ACTIVE';
  balance: number;
  created: string | Date;
  created_by_user_id: number;
  currency_id: string;
  is_main: number | null;
  name: string;
  updated: string | Date;
  updated_by_user_id: number;
  user_id: number;
}


