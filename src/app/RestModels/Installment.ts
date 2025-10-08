export interface Installment {
  id: number;
  amount: number;
  created_by_user_id: number;
  created: string;
  due_date: string | Date;
  installment_number: number;
  order_id: number;
  paid_amount: number;
  paid_timestamp: string;
  status: string;
  updated_by_user_id: number;
  updated: string;
}


