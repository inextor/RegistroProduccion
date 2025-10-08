export interface Shipping {
  id: number;
  created_by_user_id: number;
  created: string;
  date: string | Date;
  delivery_timestamp: string | Date;
  from_store_id: number;
  note: string;
  production_area_id: number;
  purchase_id: number;
  received_by_user_id: number;
  requisition_id: number;
  shipping_company: string;
  shipping_guide: string;
  status: string;
  to_store_id: number;
  updated_by_user_id: number;
  updated: string;
}


