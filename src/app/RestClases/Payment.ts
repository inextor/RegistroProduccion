export interface Payment {
  id: number;
  cancellation_reason: string;
  cancellation_timestamp: string;
  cancelled_by_user_id: number;
  change_amount: number;
  concept: string;
  created_by_user_id: number;
  created: string;
  currency_id: string;
  exchange_rate: number;
  facturado: string;
  paid_by_user_id: number;
  payment_amount: number;
  received_amount: number;
  sat_factura_id: number;
  sat_pdf_attachment_id: number;
  sat_uuid: string;
  sat_xml_attachment_id: number;
  status: string;
  store_id: number;
  sync_id: string;
  sync_uuid: any;
  tag: string;
  type: string;
  updated: string;
}


