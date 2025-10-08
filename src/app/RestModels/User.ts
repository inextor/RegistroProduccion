export interface User {
  id: number;
  birthday: string | Date;
  code: string;
  created_by_store_id: number;
  created_by_user_id: number;
  created: string;
  creation_store_id: number;
  credit_days: number;
  credit_limit: number;
  default_billing_address_id: number;
  default_shipping_address_id: number;
  email: string;
  image_id: number;
  job_address: string;
  job_name: string;
  job_phone: string;
  lat: number;
  lng: number;
  name: string;
  password: string;
  payment_address_id: number;
  payment_option: string;
  phone: string;
  platform_client_id: number;
  points: number;
  preferred_store_id: number;
  price_type_id: number;
  production_area_id: number;
  role_id: number;
  status: string;
  store_id: number;
  type: string;
  updated_by_user_id: number;
  updated: string;
  username: string;
  workshift_id: number;
}


