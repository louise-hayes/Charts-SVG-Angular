import { Component, Output } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Angular5 Charts';

  chartStyle = {
    "height.px": 300,
    "width.px": 600,
    "font-family": "Arial"
  };

  labelStyle = {
    fill: "blue"
  }

  axisLabelStyle = {
    fill: "red"
  }

  chartData = {

    xlabels: ["Jan", "Feb", "March", "April", "May", "June"],
    series: [
      { type: "line", stroke: "red", "strokewidth": "1", "strokedasharray": "5,5" , legend: 2016, yval: [100, 300, 400, 300, 200, 100] },
      { type: "line", stroke: "blue", "strokewidth": "1", "strokedasharray": "0", legend: 2017, yval: [150, 250, 350, 450, 350, 250] },
      { type: "bar", index: 1, fill: "yellow", legend: 2018, yval: [125, 275, 375, 275, 175, 100] },
      { type: "bar", index: 0, fill: "red", legend: 2019, yval: [300, 100, 200, 150, 300, 200] }
      

    ]
  }

  chartOptions = {
    axis: true,
    grid: true,
    legend: "right-top", 
    title: 'Demo Line Graph',
    labels: { xAxisID: 'Users', yAxisID: 'Months' }, //optional 
    numYlabels: 5, //default to 5 if none provided - optimal 5 or 10
    data: this.chartData,
    style: this.chartStyle, //all styles optional, component provides defaults - if passing params they will overwrite component and must be accurate css key value pairs
    labelStyle: this.labelStyle
  }

  pointClicked(event): void {
    console.log(event);


    // console.log("Point was clicked");
  }
}


