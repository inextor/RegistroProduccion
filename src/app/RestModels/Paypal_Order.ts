export interface Paypal_Order {
  id: string;
  buyer_user_id: number;
  create_response: string;
  created: string | Date;
  log: string | null;
  order_id: number | null;
  status: string;
}


