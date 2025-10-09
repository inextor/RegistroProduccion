export interface Bill {
  id: number;
  accepted_status: 'PENDING' | 'ACCEPTED' | 'REJECTED' | 'PENDING';
  amount_paid: number;
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
  paid_status: 'PENDING' | 'PAID';
  paid_to_bank_account_id: number | null;
  pdf_attachment_id: number | null;
  provider_user_id: number | null;
  purchase_id: number | null;
  receipt_attachment_id: number | null;
  status: 'DELETED' | 'ACTIVE' | 'ACTIVE';
  store_id: number | null;
  total: number;
  updated: string | Date;
}


