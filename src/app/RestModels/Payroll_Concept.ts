export interface Payroll_Concept {
  id: number;
  formula: string;
  name: string;
  status: 'ACTIVE' | 'DELETED' | 'ACTIVE';
  type: 'DEDUCTION' | 'PERCEPTION';
}


