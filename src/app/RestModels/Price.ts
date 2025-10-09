export interface Price {
  id: number;
  created_by_user_id: number | null;
  created: string | Date;
  currency_id: string;
  item_id: number;
  percent: number;
  price_list_id: number;
  price_type_id: number;
  price: number;
  tax_included: 'NO' | 'YES' | 'NO';
  updated_by_user_id: number | null;
  updated: string | Date;
}


