export interface Question {
  id: number;
  created: string | Date;
  form_id: number;
  help: string | null;
  priority: number;
  question: string;
  type: string | null;
  required: number | null;
  updated: string;
}


