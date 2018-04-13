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
    height: "150",
    width: "500"
  };
  chartData = [  
      {xlabel: "Dec", value: 70},
      {xlabel: "Feb", value: 20} ,
      {xlabel: "March", value: 60},
      {xlabel: "April", value: 20} ,
      {xlabel: "May", value: 60}
   ];
  dataSetMain = {
      type: 'line',
        title: 'Demo Line Graph',
        labels: {xAxisID:'Users',yAxisID:'Months'}, //may be blank
        data: this.chartData,
        style: this.chartStyle //may be blank
  }
}
