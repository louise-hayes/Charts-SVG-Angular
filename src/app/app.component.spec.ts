import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { Component, Output } from '@angular/core';

import { AppComponent } from './app.component';
import { GraphService } from './services/graph.service';
import { FetchDataService } from './services/fetchdata.service';
// import { ChartsComponent } from '../../public_api';
import { ChartsComponent } from './components/charts/charts.component';
import { BarChartComponent } from './components/charts/bar-chart/bar-chart.component';
import { LineChartComponent } from './components/charts/line-chart/line-chart.component';
import { AxesComponent } from './components/charts/axes/axes.component';
import { LegendComponent } from './components/charts/legend/legend.component';
import { LineChartCircleComponent } from './components/charts/line-chart-circle/line-chart-circle.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let graphService: GraphService;
  let fetchDataService: FetchDataService;




  beforeEach(async(() => {
    graphService = new GraphService;
    fetchDataService = new FetchDataService;
    component = new AppComponent(graphService, fetchDataService);
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        ChartsComponent,
        BarChartComponent,
        LineChartComponent,
        AxesComponent,
        LegendComponent,
        LineChartCircleComponent
      ],
      imports: [
        MatTooltipModule
      ],
      providers: [
        GraphService,
        FetchDataService
      ],
      
  
    }).compileComponents();
  }));


  // it('should return event ', async(() => {
  //     let answer = pointClicked(event);
  //     expect(event).toBeTruthy();
  //   }));


  it('should create the app', async(() => {

    let chartData = {

      xlabels: ["Jan", "Feb", "March", "April", "May", "June"],
      series: [
        { legend: 2016, type: "line", stroke: "red", "strokewidth": "1", "strokedasharray": "5,5", yval: [100, 300, 400, 300, 200, 100] },
        { legend: 2017, type: "line", stroke: "blue", "strokewidth": "1", "strokedasharray": "0", yval: [150, 250, 350, 450, 350, 250] },
        { legend: 2018, type: "bar", barIndex: 0, fill: "yellow", yval: [100, 300, 400, 300, 200, 100] },
        { legend: 2019, type: "bar", barIndex: 1, fill: "red", yval: [150, 250, 350, 450, 350, 250] },
        { legend: 2020, type: "bar", barIndex: 2, fill: "orange", yval: [150, 250, 350, 450, 350, 250] },


      ]
    };

    let title = 'Angular5 Charts';

    let chartStyle = {
      "height.px": 300,
      "width.px": 500,
      "font-family": "Arial"
    };

    let labelStyle = {
      fill: "blue"
    }

    let axisLabelStyle = {
      fill: "red"
    }

    let mockDataSet = {
      axis: true, //if line or bar must be true
      grid: true, //optional
      title: 'Usage',
      labels: { xAxisID: 'Months', yAxisID: 'Users' }, //optional 
      numYlabels: 5, //default to 5 if none provided - optimal 5 or 10
      data: this.chartData,
      style: this.chartStyle, //all styles optional, component provides defaults - if passing params they will overwrite component and must be accurate css key value pairs
      labelStyle: this.labelStyle,
      legendStyle: this.legendStyle,
      legendTitle: "2013",
      barWidth: 40 //optional - advice 60 for 3 bar charts etc
    }


    component.chartOptions = mockDataSet;
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));


  it(`should have as title 'app'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('Angular5 Charts');
  }));


  it('should render title Usage', async(() => {
    // component.chartOptions.title = "svg chart";
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h2').textContent).toContain('Usage');
  }));
});
