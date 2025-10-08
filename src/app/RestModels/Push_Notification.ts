export interface Push_Notification {
  id: number;
  app_path: string | null;
  body: string;
  created: string | Date;
  icon_image_id: number | null;
  link: string | null;
  object_id: string | null;
  object_type: string;
  priority: string | null;
  push_notification_id: string | null;
  read_status: string | null;
  response: string | null;
  sent_status: number | null;
  title: string;
  updated: string;
  user_id: number;
}


