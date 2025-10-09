export interface Work_Log {
  id: number;
  break_seconds: number;
  date: string;
  disciplinary_actions: string | null;
  docking_pay: number;
  end_timestamp: string | Date | null;
  extra_hours: number;
  hours: number;
  in_out_count: any;
  json_values: any | null;
  on_time: 'YES' | 'NO';
  seconds_log: number;
  start_timestamp: string | Date | null;
  total_payment: number;
  updated: string | Date;
  user_id: number;
}


