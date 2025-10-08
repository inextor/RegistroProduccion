export interface Sat_Factura {
  id: number;
  system_cancelled_timestamp: string | Date | null;
  billing_data_id: number | null;
  created_by_user_id: number | null;
  created: string | Date;
  folio: string | null;
  order_id: number | null;
  payment_id: number | null;
  pdf_attachment_id: number | null;
  request: string | null;
  serie: string | null;
  transaccion: string | null;
  type: string | null;
  updated_by_user_id: number | null;
  updated: string;
  uuid: string | null;
  xml_attachment_id: number | null;
  cancelado_por_sat: string | null;
  solicitud_cancelacion_sat_timestamp: string | Date | null;
}


