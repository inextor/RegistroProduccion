export interface Form {
  id: number;
  created: string | Date;
  created_by_user_id: number;
  description: string | null;
  is_active: number | null;
  is_response_title_required: number | null;
  responses_allowed: number;
  title: string;
  updated: string;
  updated_by_user_id: number;
}


