export interface Cash_Count {
  id: number;
  cash_close_id: number;
  currency_id: string;
  denomination: number;
  quantity: number;
  type: 'COIN' | 'BILL' | 'CREDIT_CARD' | 'DEBIT_CARD' | 'CHECK' | 'TRANSFER' | 'Tipo de efectivo o método de pago';
  created: string | Date | null;
  updated: string | Date | null;
  only_reference: any;
}


