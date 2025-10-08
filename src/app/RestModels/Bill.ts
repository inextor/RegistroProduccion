export interface Bill {
  id: number;
  accepted_status: string;
  amount_paid: number;
  aproved_by_user_id: number;
  bank_account_id: number;
  created: string;
  currency_id: string;
  due_date: string | Date;
  folio: string;
  invoice_attachment_id: number;
  name: string;
  note: string;
  organization_id: number;
  paid_by_user_id: number;
  paid_date: string | Date;
  paid_status: string;
  paid_to_bank_account_id: number;
  pdf_attachment_id: number;
  provider_user_id: number;
  purchase_id: number;
  receipt_attachment_id: number;
  status: string;
  store_id: number;
  total: number;
  updated: string;
}


