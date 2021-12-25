import { Component, OnInit } from '@angular/core';
import { ColDef, GridOptions } from 'ag-grid-community';
import { ExpensesService } from './expenses-service.service';
import { SideBarComponent } from '../side-bar/side-bar.component';
import { ActionCellRendererComponent } from '../action-cell-renderer/action-cell-renderer.component';

@Component({
  selector: 'app-expenses-dashboard',
  templateUrl: './expenses-dashboard.component.html',
  styleUrls: ['./expenses-dashboard.component.scss'],
})
export class ExpensesDashboardComponent implements OnInit {
  rowData: any;
  frameworkComponents: any = {
    'actionCellRenderer': ActionCellRendererComponent
};  
  
  constructor(private expensesService: ExpensesService) {}
  
  public expenses: any;
  public domLayout: string = 'autoHeight'
  private api: any;
  private columnApi: any;
  
  ngOnInit(): void {
    this.getExpenses();
  }

  onGridReady = (params: any) => {
    this.api = params.api;
    this.columnApi = params.columnApi;
}
  
  columnDefs: ColDef[] = [
    {
      field: 'actionColumn',
      headerName: '',
      cellRenderer: 'actionCellRenderer',
      cellRendererParams:{
        getExpenses: this.getExpenses()
      },
      width: 75,
    },
    { field: 'expenseName', headerName: 'Nazwa' },
    { field: 'expenseType', headerName: 'Typ', width: 150 },
    { field: 'expenseCategory', headerName: 'Kategoria' },
    {
      field: 'expenseAmount',
      headerName: 'Kwota',
      width: 150,
    },
    { field: 'expenseDate', headerName: 'Data', width: 150 },
  ];

  getExpenses(): void{
    this.expensesService.getExpenses().subscribe((res) => {
      this.rowData = res;
      this.rowData.forEach((expense: { expenseDate: string, expenseAmount: any }) => {
        expense.expenseAmount = expense.expenseAmount.toFixed(2) + ' zł';
        expense.expenseDate = expense.expenseDate.slice(0, 10);
      });
    });
  }

  deleteExpense(id: any): void{
    const confirm = window.confirm('Czy na pewno chcesz usunąć ten wpis?');
    if(confirm){
      this.expensesService.deleteExpense(id).subscribe(res => {
        this.getExpenses();
      });
    }
  }

}
