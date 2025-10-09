export interface Response {
  id: number;
  created: string | Date;
  created_by_user_id: number;
  form_id: number;
  respondent_identifier: string | null;
  title: string | null;
  updated: string | Date;
  updated_by_user_id: number;
  user_id: number | null;
}


