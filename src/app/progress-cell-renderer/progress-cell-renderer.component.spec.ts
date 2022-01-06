import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressCellRendererComponent } from './progress-cell-renderer.component';

describe('ProgressCellRendererComponent', () => {
  let component: ProgressCellRendererComponent;
  let fixture: ComponentFixture<ProgressCellRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProgressCellRendererComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgressCellRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
