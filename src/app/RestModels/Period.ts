export interface Period {
  id: number;
  created: string | Date;
  created_by_user_id: number;
  end_timestamp: string | Date;
  minutes_offset: number;
  note: string | null;
  reservation_id: number;
  start_timestamp: string | Date;
  status: 'ACTIVE' | 'DELETED' | 'ACTIVE';
  updated: string | Date;
  updated_by_user_id: number;
}


