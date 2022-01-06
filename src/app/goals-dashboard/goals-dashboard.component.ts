import { Component, OnInit } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { GoalsService } from './goals-service.service';
import { ActionCellRendererComponent } from '../action-cell-renderer/action-cell-renderer.component';
import { ProgressCellRendererComponent } from '../progress-cell-renderer/progress-cell-renderer.component';
@Component({
  selector: 'app-goals-dashboard',
  templateUrl: './goals-dashboard.component.html',
  styleUrls: ['./goals-dashboard.component.scss'],
})
export class GoalsDashboardComponent implements OnInit {
  rowData: any;
  frameworkComponents: any = {
    actionCellRenderer: ActionCellRendererComponent,
    progressCellRenderer: ProgressCellRendererComponent,
  };

  public domLayout: string = 'autoHeight';
  public paginationPageSize: number = 10;
  public newGoal: any = {};
  public editedGoal: any;
  public deletedGoalId: any;

  private api: any;
  private columnApi: any;

  constructor(private goalsService: GoalsService) {}

  ngOnInit(): void {
    this.getGoals();
    this.setSubscriptions();
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
        getGoals: this.getGoals(),
      },
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
    {
      field: 'goalProgress',
      headerName: 'Postęp',
      cellRenderer: 'progressCellRenderer',
      width: 150,
    },
  ];

  private getGoals() {
    this.goalsService.getGoals().subscribe((res) => {
      this.rowData = res;
      this.rowData.forEach((goal: { goalDate: string; goalAmount: any }) => {
        goal.goalAmount = goal.goalAmount.toFixed(2);
        goal.goalDate = goal.goalDate.slice(0, 10);
      });
    });
  }

  public postGoal(): void {
    this.goalsService.postGoal(this.newGoal).subscribe((res) => {
      this.getGoals();
      this.newGoal = {};
    });
  }

  public deleteGoal(): void {
    this.goalsService.deleteGoal(this.deletedGoalId).subscribe((res) => {
      this.getGoals();
    });
  }

  public editGoal(): void {
    const goalAmountHelper: number = +this.editedGoal.expenseAmount;
    this.editedGoal.expenseAmount = goalAmountHelper;
    this.goalsService
      .editGoal(this.editedGoal.goalId, this.editedGoal)
      .subscribe((res) => {
        this.getGoals();
      });
  }

  private setSubscriptions(): void {
    this.goalsService.editedGoalSubject.subscribe((editedGoal) => {
      this.editedGoal = editedGoal;
    });

    this.goalsService.deletedGoalIdSubject.subscribe((deletedGoalId) => {
      this.deletedGoalId = deletedGoalId;
    });
  }
}
