import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
import { Observable } from 'rxjs';
import { OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GoalsService {
  constructor(private http: HttpClient, private router: Router) {}

  public expenses: any;

  public editedGoal = new Observable((subscriber) => {
    subscriber.next('');
  });
  public editedGoalSubject = new BehaviorSubject(this.editedGoal);

  public deletedGoalId = new Observable((subscriber) => {
    subscriber.next(0);
  });
  public deletedGoalIdSubject = new BehaviorSubject(this.deletedGoalId);

  public getGoals(id: number): Observable<any> {
    return this.http.get('https://localhost:44330/api/Goals'+ `/${id}`);
  }

  public postGoal(goal: any): Observable<any> {
    const headers = {"Access-Control-Allow-Origin": "*"};
    return this.http.post('https://localhost:44330/api/Goals', goal, {headers});
  }

  public editGoal(id: any, goal: any): Observable<any>{
    const headers = {"Access-Control-Allow-Origin": "*"};
    return this.http.put('https://localhost:44330/api/Goals' + `/${id}`, goal, {headers});
  }

  public deleteGoal(id: any): Observable<any> {
    return this.http.delete('https://localhost:44330/api/Goals' + `/${id}`);
  }

  public setEditedGoal(params: any): any {
    this.editedGoalSubject.next(params);
  }

  public setDeletedGoalId(id: any): void{
    this.deletedGoalIdSubject.next(id);
  }
}
