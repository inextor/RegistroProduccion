export interface Bank_Account {
  id: number;
  account: string;
  alias: string;
  bank_rfc: string | null;
  bank: string;
  created: string | Date;
  currency: string;
  email: string | null;
  is_a_payment_method: string | null;
  name: string;
  updated: string;
  user_id: number | null;
}


