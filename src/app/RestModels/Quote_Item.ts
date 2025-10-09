export interface Quote_Item {
  id: number;
  created: string | Date;
  discount_percent: number;
  discount: number;
  ieps_calculated: number;
  ieps_type: 'RATE' | 'AMOUNT' | 'RATE';
  ieps_value: number;
  item_id: number;
  original_unitary_price: number;
  provider_price: number;
  qty: number;
  quote_id: number;
  status: 'ACTIVE' | 'DELETED' | 'ACTIVE';
  subtotal: number;
  tax_included: 'YES' | 'NO' | 'YES';
  tax: number;
  total: number;
  unitary_price: number;
  updated: string | Date;
}


