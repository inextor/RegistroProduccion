export interface Payroll_Value {
  id: number;
  account_id: number;
  datetime: string | Date;
  description: string;
  payroll_concept_id: number;
  payroll_id: number;
  status: string;
  type: string;
  value: number;
}


