export interface Session {
  id: string;
  user_id: number | null;
  status: 'ACTIVE' | 'INACTIVE' | 'ACTIVE';
  created: string | Date;
  updated: string | Date | null;
}


