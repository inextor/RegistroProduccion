export interface Pharos_Payment_Request {
  id: number;
  pharos_credentials_id: number;
  created_by_user_id: number;
  amount: number | null;
  created: string | Date;
  currency_id: string;
  merchant_code: string;
  order_id: number | null;
  terminal_code: string;
  transaction_uuid: any;
  response: string | null;
  updated_by_user_id: number;
  updated: string;
}


