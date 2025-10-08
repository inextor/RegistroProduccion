export interface Price_Log {
  id: number;
  created_by_user_id: number;
  created: string | Date;
  item_id: number;
  new_percent: number | null;
  new_price: number | null;
  old_percent: number | null;
  old_price: number | null;
  old_tax_included: string | null;
  price_list_id: number;
  price_type_id: number;
  tax_included: string | null;
  updated: string;
}


