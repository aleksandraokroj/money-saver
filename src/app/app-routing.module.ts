import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationComponent } from './authentication/authentication.component';
import { ExpensesDashboardComponent } from './expenses-dashboard/expenses-dashboard.component';
import { GoalsDashboardComponent } from './goals-dashboard/goals-dashboard.component';
import { StatsDashboardComponent } from './stats-dashboard/stats-dashboard.component';

const routes: Routes = [
  {path: 'auth', component: AuthenticationComponent},
  {path: 'expenses', component: ExpensesDashboardComponent},
  {path: 'goals', component: GoalsDashboardComponent},
  {path: 'stats', component: StatsDashboardComponent},
  {path: '', redirectTo: "/auth", pathMatch:'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
