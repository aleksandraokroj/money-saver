import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
import { Observable } from 'rxjs';
import { OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ExpensesService {
  constructor(private http: HttpClient, private router: Router) {}

  public expenses: any;
  public editedExpense = new Observable((subscriber) => {
    subscriber.next('');
  });
  public editedExpenseSubject = new BehaviorSubject(this.editedExpense);

  public getExpenses(): Observable<any> {
    return this.http.get('https://localhost:44330/api/Expenses');
  }

  public editExpense(id: any, expense: any): Observable<any>{
    const headers = {"Access-Control-Allow-Origin": "*"};
    return this.http.put('https://localhost:44330/api/Expenses' + `/${id}`, expense, {headers});
  }

  public deleteExpense(id: any): Observable<any> {
    return this.http.delete('https://localhost:44330/api/Expenses' + `/${id}`);
  }

  public setEditedExpense(params: any): any {
    this.editedExpenseSubject.next(params);
  }
}
