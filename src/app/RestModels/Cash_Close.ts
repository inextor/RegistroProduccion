export interface Cash_Close {
  id: number;
  cash_on_hand: number | null;
  created_by_user_id: number;
  created: string | Date;
  end: string;
  note: string | null;
  other_currencies: number | null;
  since: string | Date | null;
  start: string;
  updated: string;
}


