import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenseCellRendererComponent } from './expense-cell-renderer.component';

describe('ExpenseCellRendererComponent', () => {
  let component: ExpenseCellRendererComponent;
  let fixture: ComponentFixture<ExpenseCellRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpenseCellRendererComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpenseCellRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
