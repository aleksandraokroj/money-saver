import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ExpensesService } from '../expenses-dashboard/expenses-service.service';
import { ExpensesDashboardComponent } from '../expenses-dashboard/expenses-dashboard.component';
import { identifierModuleUrl } from '@angular/compiler';

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
    return this.params.value;
  }

  refresh(): boolean {
    return false;
  }

  showDeleteModal(): any{
    var deleteModal = document.getElementById('deleteModal');
    if(deleteModal){
      this.expensesService.setDeletedExpenseId(this.params.data.expenseId);
    }
  }

  showEditModal(): any{
    var editModal = document.getElementById('editModal');
    if(editModal){
      this.expensesService.setEditedExpense(this.params.data);
    }
  }
}

