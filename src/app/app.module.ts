import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from  '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ChartjsModule } from '@ctrl/ngx-chartjs';
import {
  ArcElement,
  BarController,
  DoughnutController,
  LineController,
  BarElement,
  Chart,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
Chart.register(ArcElement,BarController, DoughnutController, LineController, BarElement, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { ExpensesDashboardComponent } from './expenses-dashboard/expenses-dashboard.component';
import { AgGridModule } from 'ag-grid-angular';
import { GoalsDashboardComponent } from './goals-dashboard/goals-dashboard.component';
import {MatSidenavModule} from '@angular/material/sidenav'; 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SideBarComponent } from './side-bar/side-bar.component';
import { ActionCellRendererComponent } from './action-cell-renderer/action-cell-renderer.component';
import { ExpenseCellRendererComponent } from './expense-cell-renderer/expense-cell-renderer.component';
import { ProgressCellRendererComponent } from './progress-cell-renderer/progress-cell-renderer.component';
import { StatsDashboardComponent } from './stats-dashboard/stats-dashboard.component';
@NgModule({
  declarations: [
    AppComponent,
    AuthenticationComponent,
    ExpensesDashboardComponent,
    GoalsDashboardComponent,
    SideBarComponent,
    ActionCellRendererComponent,
    ExpenseCellRendererComponent,
    ProgressCellRendererComponent,
    StatsDashboardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    AgGridModule.withComponents([ActionCellRendererComponent]),
    MatSidenavModule, 
    BrowserAnimationsModule,
    ChartjsModule
  ],
  providers: [ActionCellRendererComponent, ExpensesDashboardComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
