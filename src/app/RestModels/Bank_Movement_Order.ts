export interface Bank_Movement_Order {
  id: number;
  amount: number | null;
  bank_movement_id: number;
  created_by_user_id: number | null;
  created: string | Date;
  currency_amount: number | null;
  currency_id: string;
  exchange_rate: number | null;
  order_id: number;
  status: string | null;
  updated_by_user_id: number | null;
  updated: string;
}


