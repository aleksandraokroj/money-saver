import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ExpensesService } from '../expenses-dashboard/expenses-service.service';
import { ExpensesDashboardComponent } from '../expenses-dashboard/expenses-dashboard.component';

@Component({
  selector: 'app-action-cell-renderer',
  templateUrl: './action-cell-renderer.component.html',
  styleUrls: ['./action-cell-renderer.component.scss'],
})
export class ActionCellRendererComponent
  implements OnInit, ICellRendererAngularComp
{
  constructor(private expensesService: ExpensesService, private expensesDashboard: ExpensesDashboardComponent) {}
  params: any;

  ngOnInit(): void {}

  agInit(params: any): void {
    this.params = params;
    console.log(params);
    return this.params.value;
  }

  refresh(): boolean {
    return false;
  }

  editExpense(): void {
    return console.log(this.params.edit);
  }

  deleteExpense(): void {
    // this.expensesService.deleteExpense(this.params.data.expenseId).subscribe(res => {
    //   this.params.getExpenses;
    // });
    this.expensesDashboard.deleteExpense(this.params.data.expenseId);
  }
}
