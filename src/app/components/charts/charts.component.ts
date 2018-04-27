import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { GraphService } from '../../services/graph.service';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { LineChartComponent } from './line-chart/line-chart.component';
import { NgSwitch } from '@angular/common';

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

  constructor(private graphService: GraphService ) {
    this.pClicked = new EventEmitter();
  };

  // generate line path using x y variables from dataSet.points array
  // output used to render svg d: path('M 30 50 L 100 80 L 200 60 L 280 30');
  // will be a service - draws a continuous line

  linePath(data) {
    let pathParts = [], currentPoint, i;
 console.log ("linepath " + data);
      for (i = 0; i < data.values.length; i++) {
        currentPoint = data.values[i];
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

  getClass() {
    this.dataSet.gridChoice = this.dataSet.grid ? "grid" : "nogrid";
    return this.dataSet.gridChoice;
  }

 
  setStyles(i) {
    //for line graph
    let styles = {
      stroke: this.dataSet.data.series[i].stroke, //color of line
      "stroke-width": this.dataSet.data.series[i].strokewidth, //0 thin, 6=thicker line
      "stroke-dasharray": this.dataSet.data.series[i].strokedasharray // 0 = continous line
    }
    return styles;
  }

  generateDataSet(dataSet: any) {

    //to do : check if style height & width provided and if none defaulted to chartStyle params
    if (this.dataSet.style["height.px"]) {
      this.maxHeight = parseInt(this.dataSet.style["height.px"]) - this.xLabelMargin;
      this.lineWidth = parseInt(this.dataSet.style["width.px"]);
    };


    this.chartStyle = this.dataSet.style;
    this.labelStyle = this.dataSet.labelStyle;
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
  //this will become a serivce
  getXLabels(data) {
    this.xStep = (this.lineWidth - this.leftOffset) / data.xlabels.length;
    console.log("x step : " + this.xStep);
    let xlabels = [];
    data.xlabels.forEach((item, index) => {
      xlabels.push({ x: this.leftOffset + this.xStep * index, y: this.maxHeight + this.xLineBottomMargin, text: item });
    });
    xlabels.forEach(function (item, index, array) {
      console.log("dataSet.xlabels :" , item, " " , index);
    })
    return xlabels;
  }

  getYLabels(data) {
    this.dataSet.numyYlabels = this.dataSet.numYlabels ? this.dataSet.numYlabels : 5;
    console.log("number of y labels: " + this.dataSet.numYlabels);
    data.series.forEach(function (item, index, array) {
      console.log("dataSet.series :" , item, " " , index);
    })
    // caclulate the max value of Y , to determine max height of y axis

    let ylabels = [];
    this.maxNm = this.graphService.getMax(data);
    this.maxYval = this.maxNm;
    // now round the highest y value (maxNm) from dataSet.series.yval to nearest 100th for graph readability
    this.maxNm = Math.ceil(this.maxNm / 100) * 100;
    // interval between y axis : diving the max y axis value (maxNm) by the no. of labels (default 5)
    console.log("maxHeight: " + this.maxHeight)
    this.yStep = this.maxHeight / this.dataSet.numYlabels; //calculate y Axis intervals between y Axis labels (line height / number of Y labels)
    let yStepLabel = this.maxNm / this.dataSet.numYlabels; //calculate y Axis labels (Max Y Value / number of Y labels)
    //y labels are computed from the Y Values passed via dataSet.series.yval rounded to meaningful 100's

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

  //servive : to be called for all series of dataSet

  getPoints(data) {
    let points = [];
    data.series.forEach((item, index) => {
      console.log("item " + item.type);
      let seriesNum = index;
      points.push({ type: item.type, values: [] });
      item.yval.forEach((yval, index) => {
        console.log("yvals " + yval);
        points[seriesNum].values.push({ item: yval, x: this.leftOffset + (this.xStep * index), y: this.maxHeight - (this.maxHeight / (this.maxNm / yval)) });
        console.log("Y " + points[seriesNum].values[index].y);
        console.log("points " + Object.values(points[seriesNum].values[index]));
      })
    });
    points.forEach(function (item, index, array) {
      console.log("getPoints Item :",  item, "getPoints Index : " , index);
    })
    return points;
  }


  ngOnInit() {
    console.log(this.dataSet);
    //call function to populated dataSet array which will be rendered 
    this.generateDataSet(this.dataSet);

    //sample timeout to show how graph data could be updated dynamically - this is where updates can be added pulled in
    // setTimeout( () => {
    //   this.dataSet.data = getLatestData();
    //  this.generateDataSet(this.dataSet);
    // },10000)
  }
}
