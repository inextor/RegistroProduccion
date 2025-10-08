export interface Payment {
  id: number;
  cancellation_reason: string | null;
  cancellation_timestamp: string | Date | null;
  cancelled_by_user_id: number | null;
  change_amount: number | null;
  concept: string | null;
  created_by_user_id: number | null;
  created: string | Date;
  currency_id: string;
  exchange_rate: number | null;
  facturado: string | null;
  paid_by_user_id: number | null;
  payment_amount: number | null;
  received_amount: number | null;
  sat_factura_id: number | null;
  sat_pdf_attachment_id: number | null;
  sat_uuid: string | null;
  sat_xml_attachment_id: number | null;
  status: string | null;
  store_id: number | null;
  sync_id: string | null;
  sync_uuid: any | null;
  tag: string | null;
  type: string | null;
  updated: string;
}


