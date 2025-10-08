export interface Withdrawal {
  id: number;
  amount: number | null;
  created_by_user_id: number;
  created: string | Date;
  currency: string;
  device_time: string;
  note: string;
  updated: string;
}


