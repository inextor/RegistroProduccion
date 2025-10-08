export interface Cash_Count {
  id: number;
  cash_close_id: number;
  currency_id: string;
  denomination: number | null;
  quantity: number;
  type: string | null;
  created: string | Date | null;
  updated: string | null;
  only_reference: number;
}


