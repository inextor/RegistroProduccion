export interface Payroll_Value {
  id: number;
  account_id: number | null;
  datetime: string | Date | null;
  description: string | null;
  payroll_concept_id: number | null;
  payroll_id: number;
  status: 'ACTIVE' | 'DELETED' | 'ACTIVE';
  type: 'PERCEPTION' | 'DEDUCTION';
  value: number;
}


