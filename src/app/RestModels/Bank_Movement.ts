export interface Bank_Movement {
  id: number;
  amount_received: number | null;
  bank_account_id: number | null;
  card_ending: string | null;
  client_user_id: number | null;
  created: string | Date;
  currency_id: string;
  exchange_rate: number | null;
  invoice_attachment_id: number | null;
  note: string | null;
  origin_bank_name: string | null;
  paid_date: string | null;
  payment_id: number | null;
  provider_user_id: number | null;
  receipt_attachment_id: number | null;
  received_by_user_id: number | null;
  reference: string | null;
  status: string | null;
  total: number | null;
  transaction_type: string | null;
  type: string | null;
  updated: string;
}


