export interface Requisition {
  approved_status: 'PENDING' | 'APPROVED' | 'NOT_APPROVED' | 'PENDING';
  created_by_user_id: number | null;
  created: string | Date;
  date: string;
  id: number;
  note: string | null;
  requested_to_store_id: number | null;
  required_by_store_id: number;
  required_by_timestamp: string | Date | null;
  shipped_status: 'PENDING' | 'SHIPPED' | 'PENDING';
  status: 'PENDING' | 'CANCELLED' | 'NOT_APPROVED' | 'SHIPPED' | 'CLOSED' | 'APPROVED' | 'PENDING';
  updated_by_user_id: number | null;
  updated: string | Date;
}


