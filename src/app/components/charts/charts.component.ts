import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})

export class ChartsComponent implements OnInit {
  @Input() dataSet: any;
  @Output() pClicked: EventEmitter<string>;

  leftOffset: number = 50; // leftmargin for Y Axis Main Label 
  ylineMargin: number = 5;
  lineWidth: number = 500;
  chartStyle: object;
  lineStyle: object;
  labelStyle: object;
  axisLabelStyle: object;
  xLineBottomMargin: number = 20;
  xLabelMargin: number = 60;
  leftMargin: number = 5;
  yStep: number;
  xStep: number;
  maxNm: number;
  maxYval: number;
  maxHeight: number = 250;
  rightMargin: number = 5;
  ylabelMargin: number = 0;

  constructor() {
    this.pClicked = new EventEmitter();
  };

  // generate line path using x y variables from dataSet.points array
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
  pointClicked(event): void {
    this.pClicked.emit(event);

    // console.log("Point was clicked");
  }

  generateDataSet(dataSet: any) {

    //to do : check if style height & width provided and if none defaulted to chartStyle params
    if (this.dataSet.style["height.px"]) {
      this.maxHeight = parseInt(this.dataSet.style["height.px"]) - this.xLabelMargin;
      this.lineWidth = parseInt(this.dataSet.style["width.px"]);
    };

    this.chartStyle = this.dataSet.style;
    this.labelStyle = this.dataSet.labelStyle;
    this.lineStyle = this.dataSet.lineStyle;
    this.axisLabelStyle = this.dataSet.axisLabelStyle;
    this.dataSet.ylabels = this.getYLabels(dataSet.data);
    this.dataSet.xlabels = this.getXLabels(dataSet.data);
    this.dataSet.points = this.getPoints(dataSet.data);
    this.dataSet.xline = { x1: this.leftOffset, x2: this.lineWidth, y1: this.maxHeight, y2: this.maxHeight };
    this.dataSet.yline = { x1: this.leftOffset, x2: this.leftOffset, y1: this.maxHeight, y2: 0 }
    this.dataSet.labelxTitle = { x: this.lineWidth / 2, y: this.maxHeight + this.xLabelMargin, title: this.dataSet.labels.xAxisID };
    this.dataSet.labelyTitle = { x: this.ylabelMargin, y: this.maxHeight / 2, title: this.dataSet.labels.yAxisID };
  }

  //function to generate xAxisLabels array
  getXLabels(data) {
    this.xStep = (this.lineWidth - this.leftOffset) / data.length;
    console.log("x step : " + this.xStep);
    let xlabels = [];
    data.forEach((item, index) => {
      xlabels.push({ x: this.ylineMargin + this.leftOffset + this.xStep * index, y: this.maxHeight + this.xLineBottomMargin, text: item.xlabel });
    });
    return xlabels;
  }

  getYLabels(data) {
    this.dataSet.numyYlabels = this.dataSet.numYlabels ? this.dataSet.numYlabels : 5;
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
    console.log("maxHeight: " + this.maxHeight)
    this.yStep = this.maxHeight / this.dataSet.numYlabels; //calculate y Axis intervals between y Axis labels (line height / number of Y labels)
    let yStepLabel = this.maxNm / this.dataSet.numYlabels; //calculate y Axis labels (Max Y Value / number of Y labels)
    //y labels are computed from the Y Values passed via dataSet.value rounded to meaningful 100's

    console.log("rounding max value to : " + this.maxNm.toString() + "and dividing by numYlabels " + this.dataSet.numYlabels + " Labels for Y Axis Steps: " + yStepLabel);

    for (var i = 0; i < this.dataSet.numYlabels; i++) {
      //ylabel x: is static for each ylabel (leftoffSet - yLineMargin) to plot label behind Y (horizontal) Axis
      //Ylabel y: increments in steps (steps = max value / array length) top of line = min Value e.g. 0, bottom of line = max value e.g. 300
      let yLegend = this.maxNm - (yStepLabel * i);
      ylabels.push({ x: this.leftOffset - this.ylineMargin, y: this.yStep * i, text: yLegend.toString() });
      console.log("y step " + this.yStep);

    };
    return ylabels;
  }


  getPoints(data) {
    let points = [];
    data.forEach((item, index) => {
      points.push({item:item, x: this.ylineMargin + this.leftOffset + (this.xStep * index), y: this.maxHeight - (this.maxHeight / (this.maxNm / item.value)) });
      console.log("points " + points[index].y);
    });
    return points;
  }

  
  ngOnInit() {
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
