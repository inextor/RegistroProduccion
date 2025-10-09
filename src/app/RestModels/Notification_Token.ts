export interface Notification_Token {
  id: number;
  user_id: number;
  provider: string;
  token: string;
  created: string | Date;
  updated: string | Date;
  status: 'ACTIVE' | 'DELETED' | 'ACTIVE';
}


