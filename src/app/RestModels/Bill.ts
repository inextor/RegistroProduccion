export interface Bill {
  id: number;
  accepted_status: string | null;
  amount_paid: number | null;
  aproved_by_user_id: number | null;
  bank_account_id: number | null;
  created: string | Date;
  currency_id: string;
  due_date: string | null;
  folio: string | null;
  invoice_attachment_id: number | null;
  name: string;
  note: string | null;
  organization_id: number | null;
  paid_by_user_id: number | null;
  paid_date: string | null;
  paid_status: string | null;
  paid_to_bank_account_id: number | null;
  pdf_attachment_id: number | null;
  provider_user_id: number | null;
  purchase_id: number | null;
  receipt_attachment_id: number | null;
  status: string | null;
  store_id: number | null;
  total: number | null;
  updated: string;
}


