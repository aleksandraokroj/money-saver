import { Component, OnInit } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { ExpensesService } from './expenses-service.service';
import { SideBarComponent } from '../side-bar/side-bar.component';

@Component({
  selector: 'app-expenses-dashboard',
  templateUrl: './expenses-dashboard.component.html',
  styleUrls: ['./expenses-dashboard.component.scss']
})
export class ExpensesDashboardComponent implements OnInit {
  rowData: any;

  constructor(private expensesService: ExpensesService) { }

  public expenses: any;

  ngOnInit(): void {
    this.expensesService.getExpenses().subscribe(res => {
      this.rowData = res;
    })
  }

  columnDefs: ColDef[] = [
    { field: 'expenseName', headerName: 'Wydatek' },
    { field: 'expenseCategory', headerName: 'Kategoria' },
    { field: 'expenseAmount', headerName: 'Kwota' },
    { field: 'expenseDate', headerName: 'Data' },
];


}
