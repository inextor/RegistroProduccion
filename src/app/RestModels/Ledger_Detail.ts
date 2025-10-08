export interface Ledger_Detail {
  id: number;
  ledger_id: number;
  item_id: number;
  description: string | null;
  qty: number | null;
  unitary_price: number | null;
  line_total: number | null;
  created: string | Date;
  created_by_user_id: number;
  updated: string;
  updated_by_user_id: number;
}


