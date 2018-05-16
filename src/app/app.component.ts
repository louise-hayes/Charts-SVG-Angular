import { Component, Output } from '@angular/core';
import { GraphService } from './services/graph.service';
import { FetchDataService } from './services/fetchdata.service';
import { MatButtonModule } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  constructor(
    private _graphService: GraphService,
    private _dataService: FetchDataService

  ) {
  };

  title = 'Angular5 Charts';

  chartStyle = {
    "height.px": 300,
    "width.px": 500,
    "font-family": "Arial"
  };

  labelStyle = {
    fill: "blue"
  }

  axisLabelStyle = {
    fill: "red"
  }
  legendStyle = {
    position: "relative",
    top: -350,
    left: 500

  }

  chartData = {

    xlabels: ["Jan", "Feb", "March", "April", "May", "June"],
    series: [
      { legend: "Red trucks", type: "line", stroke: "red", "strokewidth": "1", "strokedasharray": "5,5", yval: [920, 300, 400, 300, 200, 100] },
      { legend: "Blue trucks", type: "line", stroke: "blue", "strokewidth": "1", "strokedasharray": "0", yval: [50, 250, 350, 450, 350, 250] }
      // { legend: 2018, type: "bar", barIndex: 0, fill: "yellow", yval: [100, 300, 400, 300, 200, 100] },
      // { legend: 2019, type: "bar", barIndex: 1, fill: "red", yval: [150, 250, 350, 450, 350, 250] },
      // { legend: 2020, type: "bar", barIndex: 2, fill: "orange", yval: [150, 250, 350, 450, 350, 250] },


    ]
  }

  chartData2 = {

    xlabels: ["NH", "FL", "ME", "CA", "MA", "MN"],
    series: [
      { legend: 2017, type: "line", "z-index": 0, stroke: "blue", "strokewidth": "1", "strokedasharray": "0", yval: [100, 250, 350, 450, 350, 250] },
      { legend: 2016, type: "line", "z-index": 0, stroke: "red", "strokewidth": "1", "strokedasharray": "5,5", yval: [70, 300, 400, 300, 200, 100] },
      { legend: 2018, type: "bar", barIndex: 0, fill: "yellow", yval: [100, 300, 400, 300, 200, 100] },
      { legend: 2019, type: "bar", barIndex: 1, fill: "red", yval: [150, 250, 350, 450, 350, 250] },
      { legend: 2020, type: "bar", barIndex: 2, fill: "orange", yval: [150, 250, 350, 450, 350, 250] }


    ]
  }

  chartOptions = {
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

  chartOptions2 = {
    axis: true, //if line or bar must be true
    grid: true, //optional
    legend: "right-top",
    title: 'Location',
    labels: { xAxisID: 'States', yAxisID: 'Clients' }, //optional 
    numYlabels: 5, //default to 5 if none provided - optimal 5 or 10
    data: this.chartData2,
    style: this.chartStyle, //all styles optional, component provides defaults - if passing params they will overwrite component and must be accurate css key value pairs
    labelStyle: this.labelStyle,
    legendStyle: this.legendStyle,
    legendTitle: "",
    barWidth: 40 //optional - advice 60 for 3 bar charts etc

  }

  pointClicked(event): void {
    console.log(event);
  
    // alert(event.substring(1,1) + event.substring(2,1) + + event.substring(3,1));
    // alert(Object.values(event));
    var object = JSON.parse(event);
    alert(object.legend + " : " + object.yval + " In " + object.xlabel);

  }

  updateDataSet(choice) {
    console.log("button");
    console.log(this.chartOptions);
    //call service to fetch required year data
    let mockData = this._dataService.fetchData(choice);
    let chartDataTest = {
      xlabels: ["Jan", "Feb", "March", "April", "May", "June"],
      series: mockData.data,
    }
    this.chartOptions.data = chartDataTest;
    this.chartOptions.legendTitle= mockData.year;
    //call function to populated dataSet array which will be rendered 
    this.chartOptions = this._graphService.generateDataSet(this.chartOptions);
    console.log(this.chartOptions);
  }

  ngOnInit() {
    console.log("*******************App Component: calling graphService.generateDataSet**********************");
    // processDataSet : method that is calling a _graphService generateDataSet 
    // call service to generate dataSet in order to trigger a redraw - change the data the graph uses.
    // can't use ngOnChange on the dataSet - ngOnChange only works on a string
    this.chartOptions = this._graphService.generateDataSet(this.chartOptions);
    this.chartOptions2 = this._graphService.generateDataSet(this.chartOptions2);
  }


}


