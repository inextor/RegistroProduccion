export interface User_Attachment {
  id: number;
  alias: string;
  attachment_id: number;
  created_by_user_id: number;
  created: string | Date;
  status: 'ACTIVE' | 'DELETED' | 'ACTIVE';
  updated_by_user_id: number;
  updated: string | Date;
  user_id: number;
}


