export interface Quote_Item {
  id: number;
  created: string | Date;
  discount_percent: number | null;
  discount: number | null;
  ieps_calculated: number | null;
  ieps_type: string | null;
  ieps_value: number | null;
  item_id: number;
  original_unitary_price: number | null;
  provider_price: number | null;
  qty: number | null;
  quote_id: number;
  status: string | null;
  subtotal: number | null;
  tax_included: string | null;
  tax: number | null;
  total: number | null;
  unitary_price: number | null;
  updated: string;
}


