import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LineChartComponent } from './line-chart.component';
import { GraphService } from '../../../services/graph.service';


describe('LineChartComponent', () => {
  let component: LineChartComponent;
  let fixture: ComponentFixture<LineChartComponent>;
  let graphService: GraphService;

  beforeEach(async(() => {
    graphService = new GraphService;
    TestBed.configureTestingModule({
      declarations: [LineChartComponent],
      providers: [GraphService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LineChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });


//   it('should create the app', async(() => {

//     let chartData = {

//       xlabels: ["Jan", "Feb", "March", "April", "May", "June"],
//       series: [
//         { legend: 2016, type: "line", stroke: "red", "strokewidth": "1", "strokedasharray": "5,5", yval: [100, 300, 400, 300, 200, 100] },
//         { legend: 2017, type: "line", stroke: "blue", "strokewidth": "1", "strokedasharray": "0", yval: [150, 250, 350, 450, 350, 250] },
//         { legend: 2018, type: "bar", barIndex: 0, fill: "yellow", yval: [100, 300, 400, 300, 200, 100] },
//         { legend: 2019, type: "bar", barIndex: 1, fill: "red", yval: [150, 250, 350, 450, 350, 250] },
//         { legend: 2020, type: "bar", barIndex: 2, fill: "orange", yval: [150, 250, 350, 450, 350, 250] },


//       ]
//     };

//     let title = 'Angular5 Charts';

//     let chartStyle = {
//       "height.px": 300,
//       "width.px": 500,
//       "font-family": "Arial"
//     };

//     let labelStyle = {
//       fill: "blue"
//     }

//     let axisLabelStyle = {
//       fill: "red"
//     }
//     let xyPoints = [{
//       type: "line",
//       "values":
//         [{item: {
//               item: { legend: 2017, type: "line", "z-index": 0, stroke: "blue", strokewidth: 1, strokedasharray: 0, yval: [0, 100, 250, 350, 450, 350, 250] },
//               xlabel: ""
//             }, x: 50, y: 240
//           }
//         ]
//       }
//     ]

//     let mockDataSet = {
//       axis: true, //if line or bar must be true
//       grid: true, //optional
//       title: 'Usage',
//       labels: { xAxisID: 'Months', yAxisID: 'Users' }, //optional 
//       numYlabels: 5, //default to 5 if none provided - optimal 5 or 10
//       data: this.chartData,
//       xyPoints:this.xyPoints,
//       style: this.chartStyle, //all styles optional, component provides defaults - if passing params they will overwrite component and must be accurate css key value pairs
//       labelStyle: this.labelStyle,
//       legendStyle: this.legendStyle,
//       legendTitle: "2013",
//       barWidth: 40 //optional - advice 60 for 3 bar charts etc
//     }

// console.log("line chart component test");
//     component.dataSet = mockDataSet;
//     const fixture = TestBed.createComponent(LineChartComponent);
//     const app = fixture.debugElement.componentInstance;
//     expect(app).toBeTruthy();
//   }));



});
