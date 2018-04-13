import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})

export class ChartsComponent implements OnInit {
  @Input() dataSetMain: any; 

  dataSet: any;
  leftOffset: number;
  ylineMargin: number;
  yLineBottom: number;
  lineHeight: number;
  lineWidth: number;
  chartStyle: object;
  chartWidth: string;

  //x 30 y 50 places a circle on the line graph to plot the data
  constructor() {
    this.leftOffset = 80;
    this.ylineMargin = 5;
    this.yLineBottom = 150;
    this.lineHeight = 300;
    this.lineWidth = 160;

    //the chartStyle will be populated from parent style object
    //but will default to the below

    this.chartStyle = {

      "width.px": "500",
      "height.px": "200"
    }

    this.chartWidth = "700px";

    this.dataSet = {
      points: [
        { x: this.ylineMargin + this.leftOffset, y: 50, delta: -2, interval: null },
        { x: 100 + this.leftOffset, y: 80, delta: -1, interval: null },
        { x: 200 + this.leftOffset, y: 60, delta: 3, interval: null },
        { x: 280 + this.leftOffset, y: 30, delta: 4, interval: null }
      ],
      xlabels: [
        { x: this.ylineMargin + this.leftOffset, y: this.yLineBottom, text: "Jan" },
        { x: 125 + this.leftOffset, y: this.yLineBottom, text: "Feb" },
        { x: 185 + this.leftOffset, y: this.yLineBottom, text: "March" },
        { x: 245 + this.leftOffset, y: this.yLineBottom, text: "April" },
        { x: 280 + this.leftOffset, y: this.yLineBottom, text: "May" }
      ],
      ylabels: [
        { x: this.leftOffset - this.ylineMargin, y: 15, text: "100" },
        { x: this.leftOffset - this.ylineMargin, y: 40, text: "80" },
        { x: this.leftOffset - this.ylineMargin, y: 65, text: "60" },
        { x: this.leftOffset - this.ylineMargin, y: 90, text: "40" },
        { x: this.leftOffset - this.ylineMargin, y: 115, text: "20" }
      ],
      labelxTitle:
        { x: 150 + this.leftOffset, y: 170, title: "Month" },

      labelyTitle:
        { x: 40, y: 70, title: "Users" },

      xline: // how long x horizontal line 60-360
        { x1: this.leftOffset, x2: 300 + this.leftOffset, y1: 130, y2: 130 },

      yline: //how long y vertical line 5 - 130
        { x1: this.leftOffset, x2: this.leftOffset, y1: 5, y2: 130 }

    }
    console.log(this.dataSetMain);
    console.log("constructor is being fired");
  }

  //function to generate line path using x y variables from points array
  // output used to render svg d: path('M 30 50 L 100 80 L 200 60 L 280 30');
  linePath() {
    let pathParts = [], currentPoint, i;
    for (i = 0; i < this.dataSet.points.length; i++) {
      currentPoint = this.dataSet.points[i];
      pathParts.push(currentPoint.x + "," + currentPoint.y);
    }
    // console.log("M" + pathParts.join(" L"));
    // console.log(pathParts);

    return "M" + pathParts.join(" L");
    //returns "M 30 50 L 100 80 L 200 60 L 280 30"

  }

  //function to generate graph dataset 
  generateDataSet(dataSet: any) {
    console.log("generating DataSet");
    console.log(this.dataSetMain);
    console.log("method in class is being run");
    
    let xAxisLabels = this.getXLabels(dataSet.data);
    return true;
  }
  //function to generate xAxisLabels array
  getXLabels(dataSet) {
    let xlabels = [];
    dataSet.forEach(data => {
      xlabels.push({ x: this.ylineMargin + this.leftOffset, y: this.yLineBottom, text: data.xlabel });
      console.log(xlabels);
    });

  }

  ngOnInit() {
    console.log("ngOnInit is being fired");
    console.log(this.dataSetMain);
  }
}
