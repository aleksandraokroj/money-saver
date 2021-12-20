import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from  '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { ExpensesDashboardComponent } from './expenses-dashboard/expenses-dashboard.component';
import { AgGridModule } from 'ag-grid-angular';
import { GoalsDashboardComponent } from './goals-dashboard/goals-dashboard.component';
import {MatSidenavModule} from '@angular/material/sidenav'; 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SideBarComponent } from './side-bar/side-bar.component';@NgModule({
  declarations: [
    AppComponent,
    AuthenticationComponent,
    ExpensesDashboardComponent,
    GoalsDashboardComponent,
    SideBarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    AgGridModule.withComponents([]),
    MatSidenavModule, 
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
