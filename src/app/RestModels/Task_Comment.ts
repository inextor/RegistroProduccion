export interface Task_Comment {
  id: number;
  comment: string;
  created: string | Date;
  task_id: number;
  type: 'SYSTEM' | 'USER' | 'SYSTEM';
  updated: string | Date;
  user_id: number | null;
}


