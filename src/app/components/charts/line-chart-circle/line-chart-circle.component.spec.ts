import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LineChartCircleComponent } from './line-chart-circle.component';

describe('LineChartCircleComponent', () => {
  let component: LineChartCircleComponent;
  let fixture: ComponentFixture<LineChartCircleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LineChartCircleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LineChartCircleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
