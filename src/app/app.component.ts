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

  lineStyle = {
    stroke: "red",
    "stroke-width": "1", //6=thicker
    "stroke-dasharray": "5,5" // 0 = continous line
  }

  labelStyle = {
    fill: "blue"
  }
  
  axisLabelStyle = {
    fill: "red"
  }

  chartData = [
    { xlabel: "Jan", value: 1234 },
    { xlabel: "Feb", value: 745 },
    { xlabel: "March", value: 300 },
    { xlabel: "April", value: 50 },
    { xlabel: "May", value: 400 },
    { xlabel: "June", value: 600 },
    { xlabel: "July", value: 156 },
    { xlabel: "Aug", value: 236 },
    { xlabel: "Sept", value: 119 },
    { xlabel: "Oct", value: 234 },
  ];
  dataSet = {
    type: 'line',
    grid: true,
    title: 'Demo Line Graph',
    labels: { xAxisID: 'Users', yAxisID: 'Months' }, //optional 
    numYlabels: 5, //default to 5 if none provided - optimal 5 or 10
    data: this.chartData,
    style: this.chartStyle, //all styles optional, component provides defaults - if passing params they will overwrite component and must be accurate css key value pairs
    lineStyle: this.lineStyle,
    labelStyle: this.labelStyle
  }
  
  pointClicked(event): void {
    console.log(event.item.xlabel + " : " + event.item.value );
    

    // console.log("Point was clicked");
  }
}


