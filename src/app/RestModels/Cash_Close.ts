export interface Cash_Close {
  id: number;
  cash_on_hand: number;
  created_by_user_id: number;
  created: string | Date;
  end: string | Date;
  note: string | null;
  other_currencies: number;
  since: string | Date | null;
  start: string | Date;
  updated: string | Date;
}


