export interface Question {
  id: number;
  created: string | Date;
  form_id: number;
  help: string | null;
  priority: number;
  question: string;
  type: 'text' | 'textarea' | 'multiple_choice' | 'rating' | 'ranking' | 'date' | 'number' | 'tel';
  required: any | null;
  status: 'ACTIVE' | 'DELETED';
  updated: string | Date;
}
