export interface Task {
  id: number;
  category_id: number | null;
  counter: number;
  created: string | Date;
  description: string;
  in_charge_user_id: number | null;
  is_done: any;
  item_id: number | null;
  main_task_id: number | null;
  order_id: number | null;
  over_extend_qty: number;
  parent_task_id: number | null;
  process_id: number;
  process_status_id: number | null;
  production_area_id: number;
  qty: number;
  requisition_id: number | null;
  status: 'ACTIVE' | 'DELETED' | 'ACTIVE';
  updated: string | Date;
}


