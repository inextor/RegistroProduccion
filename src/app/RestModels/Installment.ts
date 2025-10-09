export interface Installment {
  id: number;
  amount: number;
  created_by_user_id: number;
  created: string | Date;
  due_date: string;
  installment_number: any;
  order_id: number;
  paid_amount: number;
  paid_timestamp: string | Date | null;
  status: 'ACTIVE' | 'DELETED';
  updated_by_user_id: number;
  updated: string | Date;
}


