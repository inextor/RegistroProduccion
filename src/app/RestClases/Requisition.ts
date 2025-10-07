export interface Requisition {
  approved_status: string;
  created_by_user_id: number;
  created: string;
  date: string | Date;
  id: number;
  note: string;
  requested_to_store_id: number;
  required_by_store_id: number;
  required_by_timestamp: string;
  shipped_status: string;
  status: string;
  updated_by_user_id: number;
  updated: string;
}


