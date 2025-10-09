export interface Form {
  id: number;
  created: string | Date;
  created_by_user_id: number;
  description: string | null;
  is_active: any | null;
  is_response_title_required: any | null;
  responses_allowed: number;
  title: string;
  updated: string | Date;
  updated_by_user_id: number;
}


