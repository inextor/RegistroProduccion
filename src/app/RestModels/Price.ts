export interface Price {
  id: number;
  created_by_user_id: number | null;
  created: string | Date;
  currency_id: string;
  item_id: number;
  percent: number | null;
  price_list_id: number;
  price_type_id: number;
  price: number | null;
  tax_included: string | null;
  updated_by_user_id: number | null;
  updated: string;
}


