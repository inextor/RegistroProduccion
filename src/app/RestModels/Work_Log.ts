export interface Work_Log {
  id: number;
  break_seconds: number;
  date: string;
  disciplinary_actions: string | null;
  docking_pay: number | null;
  end_timestamp: string | Date | null;
  extra_hours: number | null;
  hours: number | null;
  in_out_count: number;
  json_values: string | null;
  on_time: string | null;
  seconds_log: number;
  start_timestamp: string | Date | null;
  total_payment: number | null;
  updated: string;
  user_id: number;
}


