export interface Shipping {
  id: number;
  created_by_user_id: number | null;
  created: string | Date;
  date: string;
  delivery_timestamp: string | Date | null;
  from_store_id: number | null;
  note: string | null;
  production_area_id: number | null;
  purchase_id: number | null;
  received_by_user_id: number | null;
  requisition_id: number | null;
  shipping_company: string;
  shipping_guide: string;
  status: 'PENDING' | 'DELIVERED' | 'SENT' | 'CANCELLED' | 'PENDING';
  to_store_id: number;
  updated_by_user_id: number | null;
  updated: string | Date;
}


