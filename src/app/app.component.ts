import { Component, Output } from '@angular/core';
import { GraphService } from './services/graph.service';
import { DataService } from './services/data.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  constructor(
    private _graphService: GraphService,
    private _dataService: DataService

  ) {
  };
  indexYear: Number = 0;
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
    legendTitle: "2018",
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
    legendTitle: "2018",
    barWidth: 40 //optional - advice 60 for 3 bar charts etc

  }

  pointClicked(event): void {
    console.log(event);
  }

  updateDataSet(choice, index) {
    console.log("button");
    console.log(this.chartOptions);
    //call service to fetch required year data
    let mockData = this._dataService.fetchData(index,choice);

    let chartDataTest = {

      xlabels: ["Jan", "Feb", "March", "April", "May", "June"],
      series: mockData.data,
      
    }



    this.chartOptions.data = chartDataTest;
    this.chartOptions.legendTitle= mockData.year;
    
    // this.chartOptions2.data = this.chartData2;
    this.chartOptions = this._graphService.addBlanksStartChart(this.chartOptions);
    //call function to populated dataSet array which will be rendered 
    this.chartOptions = this._graphService.generateDataSet(this.chartOptions);
    console.log(this.chartOptions);
  }

  processDataset(dataset) {
    //first add blank vals to first x,y points to ensure they are placed after the start, one step after 0,0 
    dataset = this._graphService.addBlanksStartChart(dataset);
    //call service method to populate dataSet array which will be rendered by chart component
    dataset = this._graphService.generateDataSet(dataset);
    return dataset

  }

  ngOnInit() {
    console.log("*******************DataSet Being generated **********************");
    // processDataSet : method that is calling a _graphService generateDataSet 
    this.chartOptions = this.processDataset(this.chartOptions);
    this.chartOptions2 = this.processDataset(this.chartOptions2);
  }


}


