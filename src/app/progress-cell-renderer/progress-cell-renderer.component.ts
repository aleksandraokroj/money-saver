import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'app-progress-cell-renderer',
  templateUrl: './progress-cell-renderer.component.html',
  styleUrls: ['./progress-cell-renderer.component.scss']
})
export class ProgressCellRendererComponent implements OnInit, ICellRendererAngularComp {

  constructor() { }
  params: any;
  public progress: any;

  ngOnInit(): void {
  }

  agInit(params: any): void {
    this.params = params;
    console.log(this.params);
    this.progress = (this.params.value * 100 / this.params.data.goalAmount).toFixed();
    return this.params.value;
  }

  refresh(): boolean {
    return false;
  }

}
