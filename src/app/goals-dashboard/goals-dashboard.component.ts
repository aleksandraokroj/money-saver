import { Component, OnInit } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { SideBarComponent } from '../side-bar/side-bar.component';
import { GoalsService } from './goals-service.service';
@Component({
  selector: 'app-goals-dashboard',
  templateUrl: './goals-dashboard.component.html',
  styleUrls: ['./goals-dashboard.component.scss']
})
export class GoalsDashboardComponent implements OnInit {
  rowData: any;
  public domLayout: string = 'autoHeight';
  public paginationPageSize: number = 10;

  private api: any;
  private columnApi: any;

  constructor(private goalsService: GoalsService) { }

  ngOnInit(): void {
    this.goalsService.getGoals().subscribe(res => this.rowData=res);
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
      width: 75,
      lockPinned: true,
    },
    { field: 'goalName', headerName: 'Cel' },
    { field: 'goalCategory', headerName: 'Kategoria' },
    {
      field: 'goalAmount',
      headerName: 'Kwota',
      cellRenderer: (params) => params.value + ' zł',
      width: 150,
    },
    { field: 'goalDate', headerName: 'Do kiedy', width: 150, sortable: true },
    {field: 'progress', headerName: 'Postęp', width:150}
  ];

}
