export interface Price_Type {
  id: number;
  created: string | Date;
  installments: number;
  json_tags: any | null;
  model: 'AMOUNT' | 'PERCENT' | 'ALL' | 'AMOUNT' | 'Amount, Set a price as is, PERCENT the price must be update based on the reference price, A value of 20 the unitary price must be reference price*1.20';
  name: string;
  pv_bar_background_color: string;
  pv_bar_text_color: string;
  pv_bar_total_color: string;
  show_bill_code: 'YES' | 'NO' | 'YES';
  sort_priority: number;
  status: 'ACTIVE' | 'DELETED' | 'ACTIVE';
  tax_model: 'TAX_INCLUDED' | 'PLUS_TAX' | 'ALL' | 'ALL';
  type: 'RETAIL' | 'WHOLESALE' | 'RETAIL';
  updated: string | Date;
  wholesale_min_qty: number;
  wholesale_type: 'BY_ARTICLE' | 'BY_CATEGORY' | 'BY_TAG' | 'BY_ARTICLE';
}


