import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartsComponent } from './charts.component';

describe('ChartsComponent', () => {
  let component: ChartsComponent;
  let fixture: ComponentFixture<ChartsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ChartsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should generate DataSet', () => {
    let data = [
     {key: "jan", value: 10},
     {key: "feb", value: 20} ,
     {key: "march", value: 60} 
    ];
    let mockDataSet = {
      type: 'line',
        title: 'Demo Line Graph',
        labels: {x:'Users',y:'Months'},
        data: data
    }

    expect(component.generateDataSet(mockDataSet)).toEqual(true);
  });

});
