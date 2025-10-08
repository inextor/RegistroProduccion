export interface Check_In {
  created_by_user_id: number | null;
  current: number;
  date: string | null;
  id: number;
  end_timestamp: string | Date | null;
  start_timestamp: string | Date;
  updated_by_user_id: number | null;
  user_id: number;
  workshift_id: number | null;
}


