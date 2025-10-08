export interface User {
  id: number;
  birthday: string | null;
  code: string | null;
  created_by_store_id: number | null;
  created_by_user_id: number | null;
  created: string | Date;
  creation_store_id: number | null;
  credit_days: number;
  credit_limit: number | null;
  default_billing_address_id: number | null;
  default_shipping_address_id: number | null;
  email: string | null;
  image_id: number | null;
  job_address: string | null;
  job_name: string | null;
  job_phone: string | null;
  lat: number | null;
  lng: number | null;
  name: string;
  password: string | null;
  payment_address_id: number | null;
  payment_option: string | null;
  phone: string | null;
  platform_client_id: number | null;
  points: number | null;
  preferred_store_id: number | null;
  price_type_id: number;
  production_area_id: number | null;
  role_id: number | null;
  status: string | null;
  store_id: number | null;
  type: string | null;
  updated_by_user_id: number | null;
  updated: string;
  username: string | null;
  workshift_id: number | null;
}


