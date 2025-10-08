export interface Notification_Token {
  id: number;
  user_id: number;
  provider: string;
  token: string;
  created: string | Date;
  updated: string;
  status: string | null;
}


