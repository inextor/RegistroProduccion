export interface Ledger {
  id: number;
  account_id: number;
  amount: number;
  created: string;
  created_by_user_id: number;
  currency_id: string;
  description: string;
  final_balance: number;
  ledger_category_id: number;
  order_id: number;
  payment_id: number;
  previous_balance: number;
  source_document_id: string;
  source_document_type: string | null;
  transaction_type: string;
  updated: string;
  updated_by_user_id: number;
}


