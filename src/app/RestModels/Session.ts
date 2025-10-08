export interface Session {
  id: string;
  user_id: number | null;
  status: string | null;
  created: string | Date;
  updated: string | null;
}


