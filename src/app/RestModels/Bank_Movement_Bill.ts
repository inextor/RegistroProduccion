export interface Bank_Movement_Bill {
  id: number;
  amount: number | null;
  bank_movement_id: number;
  bill_id: number;
  created: string | Date;
  currency_amount: number | null;
  currency_id: string;
  exchange_rate: number | null;
  status: string | null;
  updated: string;
}


