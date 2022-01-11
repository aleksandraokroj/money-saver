import { Component, OnInit } from '@angular/core';
import { ColDef, GridOptions } from 'ag-grid-community';
import { ExpensesService } from './expenses-service.service';
import { ActionCellRendererComponent } from '../action-cell-renderer/action-cell-renderer.component';
import { ExpenseCellRendererComponent } from '../expense-cell-renderer/expense-cell-renderer.component';
import { AuthServiceService } from '../auth-service.service';
import { StatsService } from '../stats-dashboard/stats-service.service';

@Component({
  selector: 'app-expenses-dashboard',
  templateUrl: './expenses-dashboard.component.html',
  styleUrls: ['./expenses-dashboard.component.scss'],
})
export class ExpensesDashboardComponent implements OnInit {
  rowData: any;
  frameworkComponents: any = {
    actionCellRenderer: ActionCellRendererComponent,
    expenseCellRenderer: ExpenseCellRendererComponent,
  };

  constructor(
    private expensesService: ExpensesService,
    private authService: AuthServiceService, 
    private statsService: StatsService
  ) {}

  public expenses: any;
  public domLayout: string = 'autoHeight';
  public editedExpense: any;
  public deletedExpenseId: any;
  public newExpense: any = {
    expenseType: 'Wydatek',
    userId: this.authService.getCookie('userId'),
  };
  public paginationPageSize: number = 10;

  private api: any;
  private columnApi: any;

  ngOnInit(): void {
    this.setSubscriptions();
    this.getExpenses();
  }

  onGridReady = (params: any) => {
    this.api = params.api;
    this.columnApi = params.columnApi;
  };

  columnDefs: ColDef[] = [
    {
      field: 'actionColumn',
      headerName: '',
      cellRenderer: 'actionCellRenderer',
      cellRendererParams: {
        getExpenses: this.getExpenses(),
      },
      width: 75,
      lockPinned: true,
    },
    { field: 'expenseName', headerName: 'Nazwa' },
    {
      field: 'expenseType',
      headerName: 'Typ',
      cellRenderer: 'expenseCellRenderer',
      width: 150,
    },
    { field: 'expenseCategory', headerName: 'Kategoria' },
    {
      field: 'expenseAmount',
      headerName: 'Kwota',
      cellRenderer: (params) => params.value + ' zł',
      width: 150,
    },
    { field: 'expenseDate', headerName: 'Data', width: 150, sortable: true },
  ];

  getExpenses(): void {
    this.expensesService
      .getExpenses(this.authService.getCookie('userId'))
      .subscribe((res) => {
        this.rowData = res;
        this.rowData.forEach(
          (expense: { expenseDate: string; expenseAmount: any }) => {
            expense.expenseAmount = expense.expenseAmount.toFixed(2);
            expense.expenseDate = expense.expenseDate.slice(0, 10);
          }
        );
      });
  }

  postExpense(): void {
    this.newExpense.userId = this.authService.getCookie('userId');
    this.expensesService.postExpense(this.newExpense).subscribe((res) => {
      this.getExpenses();
      this.newExpense = {
        expenseType: 'Wydatek',
      };
    });
  }

  editExpense(): void {
    const expenseAmountHelper: number = +this.editedExpense.expenseAmount;
    this.editedExpense.expenseAmount = expenseAmountHelper;
    this.expensesService
      .editExpense(this.editedExpense.expenseId, this.editedExpense)
      .subscribe((res) => {
        this.getExpenses();
      });
  }

  deleteExpense(): void {
    this.expensesService
      .deleteExpense(this.deletedExpenseId)
      .subscribe((res) => {
        this.getExpenses();
      });
  }

  setSubscriptions(): void {
    this.expensesService.editedExpenseSubject.subscribe((editedExpense) => {
      this.editedExpense = editedExpense;
    });

    this.expensesService.deletedExpenseIdSubject.subscribe(
      (deletedExpenseId) => {
        this.deletedExpenseId = deletedExpenseId;
      }
    );
  }
}
