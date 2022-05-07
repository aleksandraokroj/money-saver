import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StatsService {
  constructor(private http: HttpClient, private router: Router) {}

  public getMonthlyStats(
    id: number,
    month: number,
    year: number,
    type: string
  ): Observable<any> {
    return this.http.get(
      'https://localhost:44330/api/Expenses/monthStat' +
        `/${id}` +
        `/${month}` +
        `/${year}` +
        `/${type}`
    );
  }
  public getMonthlyCategoryStats(
    id: number,
    month: number,
    year: number, type: string
  ): Observable<any> {
    return this.http.get(
      'https://localhost:44330/api/Expenses/monthStatCategory' +
        `/${id}` +
        `/${month}` +
        `/${year}` +
        `/${type}`
    );
  }
}
