export interface Installment {
  id: number;
  amount: number | null;
  created_by_user_id: number;
  created: string | Date;
  due_date: string;
  installment_number: number;
  order_id: number;
  paid_amount: number | null;
  paid_timestamp: string | Date | null;
  status: string | null;
  updated_by_user_id: number;
  updated: string | Date;
}


