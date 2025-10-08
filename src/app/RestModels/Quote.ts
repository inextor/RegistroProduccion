export interface Quote {
  approved_status: string;
  approved_time: string | Date;
  attachment_id: number;
  client_user_id: number;
  created_by_user_id: number;
  created: string;
  currency_id: string;
  email: string;
  id: number;
  name: string;
  note: string;
  phone: string;
  price_type_id: number;
  sent_timestamp: string;
  store_id: number;
  sync_id: string;
  tax_percent: number;
  updated: string;
  valid_until: string | Date;
}


