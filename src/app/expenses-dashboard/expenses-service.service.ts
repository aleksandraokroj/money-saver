import { Injectable } from '@angular/core';
import { HttpClient } from  '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExpensesService {
    constructor(private http: HttpClient, private router: Router) { }

    public expenses: any;
    public subject = new Subject();
    
    public getExpenses(): Observable<any>{
        return this.http.get('https://localhost:44330/api/Expenses');
    }

    public showModal(): void {

    }

    public deleteExpense(id: any): Observable<any>{
      return this.http.delete('https://localhost:44330/api/Expenses'+`/${id}`)
    }
}