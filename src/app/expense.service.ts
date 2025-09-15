import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { NominaConcept } from './Models/NominaConcept';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  constructor() { }

  getExpenses(userId: number, startDate: string, endDate: string): Observable<NominaConcept[]> {
    const expenses: NominaConcept[] = [
      {
        id: 1,
        name: 'Gasolina',
        type: 'EXPENSE',
        amount: 500,
        date: '2025-07-16'
      },
      {
        id: 2,
        name: 'Comida',
        type: 'EXPENSE',
        amount: 300,
        date: '2025-07-17'
      }
    ];

    return of(expenses.filter(e => e.date >= startDate && e.date <= endDate));
  }
}
