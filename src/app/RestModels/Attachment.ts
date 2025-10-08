export interface Attachment {
  id: number;
  content_type: string;
  created: string | Date;
  file_type_id: number | null;
  filename: string | null;
  height: number | null;
  original_filename: string;
  size: number;
  status: string | null;
  updated: string;
  uploader_user_id: number | null;
  width: number | null;
}


