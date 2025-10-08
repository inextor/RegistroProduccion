export interface Task_Comment {
  id: number;
  comment: string;
  created: string | Date;
  task_id: number;
  type: string | null;
  updated: string;
  user_id: number | null;
}


