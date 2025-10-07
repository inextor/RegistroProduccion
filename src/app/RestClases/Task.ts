export interface Task {
  id: number;
  category_id: number;
  counter: number;
  created: string;
  description: string;
  in_charge_user_id: number;
  is_done: number;
  item_id: number;
  main_task_id: number;
  order_id: number;
  over_extend_qty: number;
  parent_task_id: number;
  process_id: number;
  process_status_id: number;
  production_area_id: number;
  qty: number;
  requisition_id: number;
  status: string;
  updated: string;
}


