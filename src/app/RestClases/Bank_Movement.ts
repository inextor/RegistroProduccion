export interface Bank_Movement {
  id: number;
  amount_received: number;
  bank_account_id: number;
  card_ending: string;
  client_user_id: number;
  created: string;
  currency_id: string;
  exchange_rate: number;
  invoice_attachment_id: number;
  note: string;
  origin_bank_name: string;
  paid_date: string | Date;
  payment_id: number;
  provider_user_id: number;
  receipt_attachment_id: number;
  received_by_user_id: number;
  reference: string;
  status: string;
  total: number;
  transaction_type: string;
  type: string;
  updated: string;
}


