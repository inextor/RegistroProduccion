export interface NominaConcept {
  id: number;
  name: string;
  type: 'INCOME' | 'EXPENSE';
  amount: number;
  date: string;
}
