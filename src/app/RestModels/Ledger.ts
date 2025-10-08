export interface Ledger {
  id: number;
  account_id: number;
  amount: number | null;
  created: string | Date;
  created_by_user_id: number;
  currency_id: string;
  description: string | null;
  final_balance: number | null;
  ledger_category_id: number | null;
  order_id: number | null;
  payment_id: number | null;
  previous_balance: number | null;
  source_document_id: string | null;
  source_document_type: string | null;
  transaction_type: string | null;
  updated: string;
  updated_by_user_id: number;
}


