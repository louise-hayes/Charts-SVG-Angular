import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'app';
   chartStyle = {
    backgroundColor: "#FFFFFF",
    labelsFontColor: "#000000",
    lineColor: "#FF0000",
    "height.px": "600",
    "width.px": "500"
  };
  chartData = [  
      {xlabel: "Dec", value: 488},
      {xlabel: "Feb", value: 100} ,
      {xlabel: "March", value: 250},
      {xlabel: "April", value: 50} ,
      {xlabel: "Aug", value: 80}
   ];
  dataSetMain = {
      type: 'line',
        title: 'Demo Line Graph',
        labels: {xAxisID:'Users',yAxisID:'Months'}, //may be blank
        data: this.chartData,
        style: this.chartStyle //may be blank
  }
}
