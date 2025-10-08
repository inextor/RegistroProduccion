export interface Offer {
  id: number;
  category_id: number | null;
  coupon_code: string | null;
  created_by_user_id: number;
  created: string | Date;
  description: string | null;
  discount: number | null;
  gift_item_id: number | null;
  hour_end: any;
  hour_start: any;
  image_id: number | null;
  is_cumulative: string | null;
  is_valid_friday: number;
  is_valid_monday: number;
  is_valid_saturday: number;
  is_valid_sunday: number;
  is_valid_thursday: number;
  is_valid_tuesday: number;
  is_valid_wednesday: number;
  item_id: number | null;
  m: number | null;
  n: number | null;
  name: string;
  status: string | null;
  store_id: number | null;
  tag: string | null;
  type: string | null;
  updated_by_user_id: number;
  updated: string | Date;
  valid_from: string;
  valid_thru: string;
  qty: number | null;
  price_type_id: number | null;
  price: number | null;
}


