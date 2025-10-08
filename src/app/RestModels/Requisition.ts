export interface Requisition {
  approved_status: string | null;
  created_by_user_id: number | null;
  created: string | Date;
  date: string;
  id: number;
  note: string | null;
  requested_to_store_id: number | null;
  required_by_store_id: number;
  required_by_timestamp: string | Date | null;
  shipped_status: string | null;
  status: string | null;
  updated_by_user_id: number | null;
  updated: string | Date;
}


