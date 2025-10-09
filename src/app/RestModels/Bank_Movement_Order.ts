export interface Bank_Movement_Order {
  id: number;
  amount: number;
  bank_movement_id: number;
  created_by_user_id: number | null;
  created: string | Date;
  currency_amount: number;
  currency_id: string;
  exchange_rate: number;
  order_id: number;
  status: 'ACTIVE' | 'DELETED' | 'ACTIVE';
  updated_by_user_id: number | null;
  updated: string | Date;
}


