export interface Offer {
  id: number;
  category_id: number;
  coupon_code: string;
  created_by_user_id: number;
  created: string;
  description: string;
  discount: number;
  gift_item_id: number;
  hour_end: any;
  hour_start: any;
  image_id: number;
  is_cumulative: string;
  is_valid_friday: number;
  is_valid_monday: number;
  is_valid_saturday: number;
  is_valid_sunday: number;
  is_valid_thursday: number;
  is_valid_tuesday: number;
  is_valid_wednesday: number;
  item_id: number;
  m: number;
  n: number;
  name: string;
  status: string;
  store_id: number;
  tag: string;
  type: string;
  updated_by_user_id: number;
  updated: string;
  valid_from: string | Date;
  valid_thru: string | Date;
  qty: number;
  price_type_id: number;
  price: number;
}


