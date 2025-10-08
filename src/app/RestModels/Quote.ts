export interface Quote {
  approved_status: string | null;
  approved_time: string | null;
  attachment_id: number | null;
  client_user_id: number | null;
  created_by_user_id: number;
  created: string | Date;
  currency_id: string;
  email: string;
  id: number;
  name: string;
  note: string | null;
  phone: string;
  price_type_id: number | null;
  sent_timestamp: string | Date | null;
  store_id: number;
  sync_id: string;
  tax_percent: number | null;
  updated: string;
  valid_until: string | null;
}


