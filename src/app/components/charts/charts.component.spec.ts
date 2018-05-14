import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ChartsComponent } from './charts.component';
import { GraphService } from '../../services/graph.service';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { LineChartComponent } from './line-chart/line-chart.component';
import { AxesComponent } from './axes/axes.component';
import { LegendComponent } from './legend/legend.component';
import { LineChartCircleComponent } from './line-chart-circle/line-chart-circle.component';
import { MatTooltipModule } from '@angular/material/tooltip';
// import { MatButtonModule } from '@angular/material';

describe('ChartsComponent', () => {
  let component: ChartsComponent;
  let fixture: ComponentFixture<ChartsComponent>;
  let graphService: GraphService;

  beforeEach(async(() => {
    graphService = new GraphService;
    component = new ChartsComponent(graphService);

    TestBed.overrideComponent(ChartsComponent, {

      //without override then 
      // set: {
      //   template: '<div>Overridden template here</div>'
      //   // ...
      // }


    });

    TestBed.configureTestingModule({
      declarations: [
        ChartsComponent,
        BarChartComponent,
        LineChartComponent,
        AxesComponent,
        LegendComponent,
        LineChartCircleComponent
      ],
      imports: [MatTooltipModule],
      providers: [GraphService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartsComponent);

    fixture.detectChanges();
  });
  afterEach(() => {
    graphService = null;
    component = null;
  });

  it('should create', () => {

    let chartData = {

      xlabels: ["Jan", "Feb", "March", "April", "May", "June"],
      series: [
        { legend: 2016, type: "line", stroke: "red", strokewidth: 1, strokedasharray: "5, 5", yval: [100, 300, 400, 300, 200, 100] }


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
    let legendStyle = {
      position: "relative",
      top: -350,
      left: 500

    }


    let mockDataSet = {
      xypoints: undefined,
      axis: true, //if line or bar must be true
      grid: true, //optional
      title: 'Usage',
      labels: { xAxisID: 'Months', yAxisID: 'Users' }, //optional 
      numYlabels: 5, //default to 5 if none provided - optimal 5 or 10
      data: chartData,
      style: chartStyle, //all styles optional, component provides defaults - if passing params they will overwrite component and must be accurate css key value pairs
      labelStyle: labelStyle,
      legendStyle: legendStyle,
      legendTitle: 2013,
      barWidth: 40 //optional - advice 60 for 3 bar charts etc
    }

    let xypoints = [{
        type: "line",
        "values":
          [{item: {
                item: { legend: 2017, type: "line", "z-index": 0, stroke: "blue", strokewidth: 1, strokedasharray: 0, yval: [0, 100, 250, 350, 450, 350, 250] },
                xlabel: ""
              }, x: 50, y: 240
            }
          ]
        }
      ]


    
           

    
    mockDataSet.xypoints = xypoints;
    //component.dataSet = mockDataSet;
    expect(component).toBeTruthy();
  });


});
