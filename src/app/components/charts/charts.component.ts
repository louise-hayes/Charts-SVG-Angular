import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})

export class ChartsComponent implements OnInit {
  @Input() dataSet: any;

  leftOffset: number;
  ylineMargin: number;
  yLineTop: number;
  lineWidth: number;
  chartStyle: object;
  lineStyle: object;
  labelStyle: object;
  xLineBottomMargin: number;
  xLabelMargin: number;
  leftMargin: number;
  yStep: number;
  xStep: number;
  maxNm: number;
  maxYval: number;
  maxHeight: number;
  rightMargin: number;

  //x 30 y 50 places a circle on the line graph to plot the data
  constructor() {

    //the chartStyle will be populated from input() dataSet.Style object
    //but will default to the below
    this.chartStyle = {
      "width.px": 700,
      "height.px": 600
    }

    this.leftOffset = 150;
    this.leftMargin = 40;
    this.ylineMargin = 5;
    this.yLineTop = 0;
    this.xLineBottomMargin = 20;
    this.xLabelMargin = 60;
    this.rightMargin = 5;
  };

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

  //function to generate graph dataset -  param dataSet received from parent App by Include()

  generateDataSet(dataSet: any) {
    this.maxHeight = parseInt(this.dataSet.style["height.px"]) - this.xLabelMargin;
    this.lineWidth = parseInt(this.dataSet.style["width.px"]);
    this.chartStyle = this.dataSet.style;
    this.labelStyle = this.dataSet.labelStyle;
    this.lineStyle = this.dataSet.lineStyle;
    this.dataSet.ylabels = this.getYLabels(dataSet.data);
    this.yLineTop = this.maxHeight;
    this.dataSet.xlabels = this.getXLabels(dataSet.data);
    this.dataSet.points = this.getPoints(dataSet.data);
    this.dataSet.xline = { x1: this.leftOffset, x2: this.lineWidth, y1: this.yLineTop, y2: this.yLineTop };
    this.dataSet.yline = { x1: this.leftOffset, x2: this.leftOffset, y1: this.yLineTop, y2: 0 }
    this.dataSet.labelxTitle = { x: this.lineWidth / 2, y: this.yLineTop + this.xLabelMargin, title: "Month" };
    this.dataSet.labelyTitle = { x: this.leftOffset - 100, y: this.yLineTop / 2, title: "Users" };
  }

  //function to generate xAxisLabels array
  getXLabels(data) {
    this.xStep = (this.lineWidth - (this.leftOffset + this.leftMargin + this.rightMargin)) / data.length;
    
    let xlabels = [];
    data.forEach((item, index) => {
      xlabels.push({ x: this.ylineMargin + this.leftOffset + this.xStep * index, y: this.yLineTop + this.xLineBottomMargin, text: item.xlabel });
    });
    return xlabels;
  }

  getYLabels(data) {
    this.dataSet.numyYlabels = this.dataSet.numYlabels? this.dataSet.numYlabels:5;
    console.log("number of y labels: " + this.dataSet.numYlabels);

    // function to caclulate the max value of Y , to plot the graph ticks/legends 
    function getMax() {
      let m = 0;
      data.forEach(item => {
        if (item.value > m) {
          m = item.value;
        }
      });
      console.log("max Y axis Value (Max Nm : " + m);
      return m;
    }

    let ylabels = [];
    this.maxNm = getMax();
    this.maxYval = this.maxNm;
    // now round the highest y value (macNm) from dataSet.value to nearest 100th for graph readability
    this.maxNm = Math.ceil(this.maxNm / 100) * 100;
    // interval between y axis legends/labels is determined by diving the max y axis value (maxNm) by the no. of labels (default 5)
    this.yStep = this.maxHeight / this.dataSet.numYlabels; //calculate y Axis intervals between y Axis labels (line height / number of Y labels)
    let yStepLabel = this.maxNm / this.dataSet.numYlabels; //calculate y Axis labels (Max Y Value / number of Y labels)
    console.log("rounding max value to : " + this.maxNm.toString() + "and dividing by numYlabels " + this.dataSet.numYlabels + " Labels for Y Axis Steps: " + yStepLabel);

    for (var i = 0; i < this.dataSet.numYlabels; i++) {
      //text for ylabel is computed from the Y Values passed via dataSet.value but rounded to meaningful 100's
      //llabel x = (static for each ylabel) (leftoffSet - yLineMargin) to plot label behind Y (horizontal) Axis
      //Ylabel y: increments in steps (steps = max value / array length) top of line = min Value e.g. 0, bottom of line = max value e.g. 300
      let yLegend = this.maxNm - (yStepLabel * i);
      ylabels.push({ x: this.leftOffset - this.ylineMargin, y: this.yStep * i, text: yLegend.toString() });

    };
    return ylabels;
  }


  getPoints(data) {
    let points = [];
    data.forEach((item, index) => {
      points.push({ x: this.ylineMargin + this.leftOffset + (this.xStep * index), y: this.maxHeight - (this.maxHeight / (this.maxNm / item.value)) });
      console.log("points " + points[index].y);
    });
    return points;
  }

  ngOnInit() {
    console.log("ngOnInit is being fired");
    console.log(this.dataSet);
    //call function to populated dataSet array which will be rendered 
    this.generateDataSet(this.dataSet);
    
    //sample to timeout to show how graph data could be updated dynamically - this is where updated dataSet can be added

    // setTimeout( () => {
    //   this.dataSet.data= [  
    //     {xlabel: "Jan", value: 1234},
    //     {xlabel: "Feb", value: 745} ,
    //     {xlabel: "March", value: 300},
    //     {xlabel: "April", value: 50} ,
    //     {xlabel: "May", value: 700},
    //     {xlabel: "June", value: 600}
    //  ]
    //  this.generateDataSet(this.dataSet);


    // },10000)
  }
}
