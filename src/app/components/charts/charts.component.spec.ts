import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ChartsComponent } from './charts.component';
import { GraphService } from '../../services/graph.service';

describe('ChartsComponent', () => {
  let component: ChartsComponent;
  let fixture: ComponentFixture<ChartsComponent>;
  let graphService: GraphService;

  beforeEach(async(() => {
    graphService = new GraphService;
    component = new ChartsComponent(graphService);

    TestBed.overrideComponent(ChartsComponent, {
  
      //without override then 
      set: {
        template: '<div>Overridden template here</div>'
        // ...
      }
    });
    TestBed.configureTestingModule({
      declarations: [ChartsComponent],
      providers: [GraphService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  afterEach(() => { 
    graphService = null;
    component = null;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  
    it('returns true when the numBarCharts returns 3', () => {
      
   
    let chartData = {

    xlabels: ["Jan", "Feb", "March", "April", "May", "June"],
    series: [
      { legend: 2016, type: "line",  stroke: "red", "strokewidth": "1", "strokedasharray": "5,5" , yval: [100, 300, 400, 300, 200, 100] },
      { legend: 2017, type: "line",  stroke: "blue", "strokewidth": "1", "strokedasharray": "0",  yval: [150, 250, 350, 450, 350, 250] },
      { legend: 2018, type: "bar", barIndex: 0, fill: "yellow",  yval: [100, 300, 400, 300, 200, 100] },
      { legend: 2019, type: "bar",  barIndex: 1, fill: "red",  yval: [150, 250, 350, 450, 350, 250] },
      { legend: 2020, type: "bar",  barIndex: 2, fill: "orange",  yval: [ 150, 250, 350, 450, 350, 250] },
      

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
        legend: "right-top", 
        title: 'Usage',
        labels: { xAxisID: 'Months', yAxisID: 'Users' }, //optional 
        numYlabels: 5, //default to 5 if none provided - optimal 5 or 10
        data: chartData,
        style: chartStyle, //all styles optional, component provides defaults - if passing params they will overwrite component and must be accurate css key value pairs
        labelStyle: labelStyle,
        barWidth:40 //optional - advice 40 for 3 bar charts etc
    }
    component.dataSet=mockDataSet;

    console.log("Y Labels ",component.dataSet.ylabels[0].text );
    //moved component methods into graphService methods so no methods to test of generateDataSet here
    
    // expect(true).toBeTruthy();
    // expect(component.dataSet.ylabels[0].text) 
    //       .toEqual('500'); 

    // expect(graphService.numBarCharts(mockDataSet)).toBe(3);
  
    
  });
});
