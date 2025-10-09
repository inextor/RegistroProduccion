export interface Process_Status {
  id: number;
  created: string | Date;
  mark_task_as_done: any;
  name: string;
  process_id: number;
  status: 'ACTIVE' | 'DELETED' | 'ACTIVE';
  updated: string | Date;
}


