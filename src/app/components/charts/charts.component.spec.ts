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
     {xlabel: "Nov", value: 70},
     {xlabel: "Feb", value: 20} ,
     {xlabel: "March", value: 60},
     {xlabel: "April", value: 20} ,
     {xlabel: "May", value: 60}
      
    ];

    //for future use: styling to be implemented after basic graph functionality working
    let style = {
      backgroundColor: "#FFFFFF",
      labelsFontColor: "#000000",
      lineColor: "#FF0000",
      height: "150",
      width: "500"
    };

    let mockDataSet = {
      type: 'line',
        title: 'Demo Line Graph',
        labels: {xAxisID:'Users',yAxisID:'Months'}, //may be blank
        data: data,
        style: style //may be blank
    }

    expect(component.generateDataSet(mockDataSet)).toEqual(true);
  });

});
