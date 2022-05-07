import { Component, OnInit } from '@angular/core';
import type { ChartData, ChartOptions } from 'chart.js';
import { AuthServiceService } from '../auth-service.service';
import { StatsService } from './stats-service.service';

@Component({
  selector: 'app-stats-dashboard',
  templateUrl: './stats-dashboard.component.html',
  styleUrls: ['./stats-dashboard.component.scss'],
})
export class StatsDashboardComponent implements OnInit {
  public monthData: any;
  public month: number = 2;
  public year: number = 2022;
  public expenseDataLoaded: boolean = false;
  public incomeDataLoaded: boolean = false;
  public categoryDataLoaded: boolean = false;
  public monthIncome = 0;
  public monthExpense = 0;

  private categories: any = [];
  private monthCategoryData: any;

  constructor(
    private authService: AuthServiceService,
    private statsService: StatsService
  ) {}

  ngOnInit(): void {
    this.getMonthlyStats();
  }
  public categoryData = {
    labels: ['test'],
    datasets: [
      {
        label: 'My First Dataset',
        data: [1],
        backgroundColor: [
          'rgba(108, 99, 255, 1)',
          'rgba(100, 194, 71, 1)',
          'rgba(245, 40, 145, 0.8)',
          'rgba(245, 39, 39, 0.8)',
          'rgba(39, 93, 245, 0.8)',
          'rgba(245, 191, 39, 0.8)',
          'rgb(156, 246, 246)',
          'rgb(237, 246, 125)',
          'rgb(255, 136, 17)',
          'rgb(69, 80, 59)',
        ],
        hoverOffset: 4,
      },
    ],
  };

  public expenseData: ChartData = {
    labels: [],
    datasets: [
      {
        label: 'Wydatki',
        data: [],
        borderColor: ['rgb(181, 0, 0)'],
        backgroundColor: ['rgb(181, 0, 0)'],
        barThickness: 20,
      },
    ],
  };
  public incomeData: ChartData = {
    labels: [],
    datasets: [
      {
        label: 'Przychody',
        data: [],
        borderColor: ['rgb(69, 118, 4)'],
        backgroundColor: ['rgb(69, 118, 4)'],
        barThickness: 20,
      },
    ],
  };
  public options: ChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };
  public categoryOptions: ChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        title: {
          display: true,
          text: 'Kategorie wpisów',
        },
        position: 'right',
      },
    },
  };

  public getMonthlyStats(): void {
    this.getMonthlyExpenseStats(this.month, this.year);
    this.getMonthlyIncomeStats(this.month, this.year);
    this.getCategoryStats(this.month, this.year);
  }

  private countOccurrences(arr: any[]) {
    return arr.reduce(
      (prev, curr) => ((prev[curr] = ++prev[curr] || 1), prev),
      {}
    );
  }

  private getCategoryStats(month: number, year: number): void {
    this.categoryDataLoaded = false;
    this.statsService
      .getMonthlyCategoryStats(
        this.authService.getCookie('userId'),
        month,
        year,
        'Wydatek'
      )
      .subscribe((res) => {
        this.categoryData.datasets[0].data = [];
        this.categoryData.labels = [];
        this.categories = [];
        this.monthCategoryData = res;
        this.monthCategoryData.forEach((expense: { expenseCategory: any }) => {
          this.categories.push(expense.expenseCategory);
        });
        const categoriesOccurances = this.countOccurrences(this.categories);
        for (const [key, value] of Object.entries(categoriesOccurances)) {
          let valueHelper = value as number;
          this.categoryData.labels.push(key);
          this.categoryData.datasets[0].data.push(valueHelper);
        }
        this.categoryDataLoaded = true;
      });
  }

  private getMonthlyExpenseStats(month: number, year: number): void {
    const monthExpenseHelper: number = 0;
    this.monthExpense = 0;
    this.expenseDataLoaded = false;
    this.statsService
      .getMonthlyStats(
        this.authService.getCookie('userId'),
        month,
        year,
        'Wydatek'
      )
      .subscribe((res) => {
        this.expenseData.datasets[0].data = [];
        this.expenseData.labels = [];
        this.monthData = res;
        this.monthData.forEach(
          (
            expense: {
              expenseDate: string;
              expenseAmount: any;
              expenseType: any;
            },
            index: number
          ) => {
            expense.expenseAmount = expense.expenseAmount.toFixed(2);
            const expenseAmountHelper: number = +expense.expenseAmount;
            expense.expenseDate = expense.expenseDate.slice(0, 10);
            if (
              this.monthData[index - 1]?.expenseDate ==
              this.monthData[index].expenseDate
            ) {
              this.expenseData.datasets[0].data[length - 1] =
                +expenseAmountHelper;
              this.monthExpense += expenseAmountHelper;
            } else {
              this.expenseData.labels?.push(expense.expenseDate);
              this.expenseData.datasets[0].data.push(expenseAmountHelper);
              this.monthExpense += expenseAmountHelper;
            }
          }
        );
        const monthExpenseHelper: number = +this.monthExpense.toFixed(2);
        this.monthExpense = monthExpenseHelper;
        this.expenseDataLoaded = true;
      });
  }
  private getMonthlyIncomeStats(month: number, year: number): void {
    this.monthIncome = 0;
    this.incomeDataLoaded = false;
    this.statsService
      .getMonthlyStats(
        this.authService.getCookie('userId'),
        month,
        year,
        'Przychód'
      )
      .subscribe((res) => {
        this.incomeData.datasets[0].data = [];
        this.incomeData.labels = [];
        this.monthData = res;
        this.monthData.forEach(
          (
            expense: {
              expenseDate: string;
              expenseAmount: any;
              expenseType: any;
            },
            index: number
          ) => {
            expense.expenseAmount = expense.expenseAmount.toFixed(2);
            const expenseAmountHelper: number = +expense.expenseAmount;
            expense.expenseDate = expense.expenseDate.slice(0, 10);
            if (
              this.monthData[index - 1]?.expenseDate ==
              this.monthData[index].expenseDate
            ) {
              this.incomeData.datasets[0].data[length - 1] =
                +expenseAmountHelper;
              this.monthIncome += expenseAmountHelper;
            } else {
              this.incomeData.labels?.push(expense.expenseDate);
              this.incomeData.datasets[0].data.push(expenseAmountHelper);
              this.monthIncome += expenseAmountHelper;
              this.monthIncome.toFixed(2);
            }
          }
        );
        const monthIncomeHelper: number = +this.monthIncome.toFixed(2);
        this.monthIncome = monthIncomeHelper;
        this.incomeDataLoaded = true;
      });
  }
}
