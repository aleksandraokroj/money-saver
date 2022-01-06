import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'app-expense-cell-renderer',
  templateUrl: './expense-cell-renderer.component.html',
  styleUrls: ['./expense-cell-renderer.component.scss'],
})
export class ExpenseCellRendererComponent
  implements OnInit, ICellRendererAngularComp
{
  constructor() {}
  params: any;

  ngOnInit(): void {}

  agInit(params: any): void {
    this.params = params;
    return this.params.value;
  }

  refresh(): boolean {
    return false;
  }
}
