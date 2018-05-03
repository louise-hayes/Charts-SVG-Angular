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
    "width.px": 500,
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
      { legend: 2016, type: "line", stroke: "red", "strokewidth": "1", "strokedasharray": "5,5" , yval: [100, 300, 400, 300, 200, 100] },
      { legend: 2017, type: "line", stroke: "blue", "strokewidth": "1", "strokedasharray": "0",  yval: [150, 250, 350, 450, 350, 250] },
      { legend: 2018, type: "bar", barIndex: 0, fill: "yellow",  yval: [100, 300, 400, 300, 200, 100] },
      { legend: 2019, type: "bar", barIndex: 1, fill: "red",  yval: [150, 250, 350, 450, 350, 250] },
      { legend: 2020, type: "bar", barIndex: 2, fill: "orange",  yval: [ 150, 250, 350, 450, 350, 250] },
      

    ]
  }

  chartOptions = {
    axis: true, //if line or bar must be true
    grid: true, //optional
    legend: "right-top", 
    title: 'Demo Graph',
    labels: { xAxisID: 'Users', yAxisID: 'Months' }, //optional 
    numYlabels: 5, //default to 5 if none provided - optimal 5 or 10
    data: this.chartData,
    style: this.chartStyle, //all styles optional, component provides defaults - if passing params they will overwrite component and must be accurate css key value pairs
    labelStyle: this.labelStyle,
    barWidth:40 //optional - advice 60 for 3 bar charts etc
  }

  pointClicked(event): void {
    console.log(event);
  }
}


