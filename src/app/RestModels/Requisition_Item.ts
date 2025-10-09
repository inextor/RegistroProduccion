export interface Requisition_Item {
  aproved_status: 'NOT_APPROVED' | 'APPROVED' | 'NOT_APPROVED';
  created: string | Date;
  id: number;
  item_id: number;
  qty: number;
  requisition_id: number;
  status: 'ACTIVE' | 'DELETED' | 'ACTIVE';
  updated: string | Date;
}


