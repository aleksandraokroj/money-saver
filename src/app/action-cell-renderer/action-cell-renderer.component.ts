import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ExpensesService } from '../expenses-dashboard/expenses-service.service';
import { GoalsService } from '../goals-dashboard/goals-service.service';
import { ExpensesDashboardComponent } from '../expenses-dashboard/expenses-dashboard.component';

@Component({
  selector: 'app-action-cell-renderer',
  templateUrl: './action-cell-renderer.component.html',
  styleUrls: ['./action-cell-renderer.component.scss'],
})
export class ActionCellRendererComponent
  implements OnInit, ICellRendererAngularComp
{
  constructor(
    private expensesService: ExpensesService,
    private expensesDashboard: ExpensesDashboardComponent,
    private goalsService: GoalsService
  ) {}
  params: any;

  ngOnInit(): void {}

  agInit(params: any): void {
    this.params = params;
    return this.params.value;
  }

  refresh(): boolean {
    return false;
  }

  showDeleteModal(): any {
    var deleteModal = document.getElementById('deleteModal');
    if (deleteModal && this.params.data.hasOwnProperty('expenseId')) {
      this.expensesService.setDeletedExpenseId(this.params.data.expenseId);
    }
    if (deleteModal && this.params.data.hasOwnProperty('goalId')) {
      this.goalsService.setDeletedGoalId(this.params.data.goalId);
    }
  }

  showEditModal(): any {
    var editModal = document.getElementById('editModal');
    if (editModal && this.params.data.hasOwnProperty('expenseId')) {
      this.expensesService.setEditedExpense(this.params.data);
    }

    if (editModal && this.params.data.hasOwnProperty('goalId')) {
      this.goalsService.setEditedGoal(this.params.data);
    }
  }
}
