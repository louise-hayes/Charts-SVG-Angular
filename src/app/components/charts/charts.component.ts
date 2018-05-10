import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { GraphService } from '../../services/graph.service';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { LineChartComponent } from './line-chart/line-chart.component';
import { AxesComponent } from './axes/axes.component';
import { MatTooltip } from '@angular/material';

import { NgSwitch } from '@angular/common';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})

export class ChartsComponent implements OnInit {
  @Input() dataSet: any;
  @Output() pClicked: EventEmitter<string>;
  position = 'before';

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
  ylabelMargin: number = 10;


  constructor(private graphService: GraphService) {
    this.pClicked = new EventEmitter();
  };
  generateDataSet() {
    //check if style height & width provided and if none defaulted to chartStyle params
    if (this.dataSet.style["height.px"]) {
      this.maxHeight = parseInt(this.dataSet.style["height.px"]) - this.xLabelMargin;
      this.lineWidth = parseInt(this.dataSet.style["width.px"]) - 30;
    }
    else {

    }
    

    this.chartStyle = this.dataSet.style;
    this.labelStyle = this.dataSet.labelStyle;
    this.axisLabelStyle = this.dataSet.axisLabelStyle;
    this.dataSet.ylabels = this.getYLabels(this.dataSet.data);
    this.dataSet.xlabels = this.getXLabels(this.dataSet.data);
    this.dataSet.xypoints = this.getxyPoints(this.dataSet.data);
    this.dataSet.xline = { x1: this.leftOffset, x2: this.lineWidth, y1: this.maxHeight, y2: this.maxHeight };
    this.dataSet.yline = { x1: this.leftOffset, x2: this.leftOffset, y1: this.maxHeight, y2: 0 }
    this.dataSet.labelxTitle = { x: this.lineWidth / 2, y: this.maxHeight + this.xLabelMargin, title: this.dataSet.labels.xAxisID };
    this.dataSet.labelyTitle = { x: this.ylabelMargin, y: this.maxHeight / 2, title: this.dataSet.labels.yAxisID };
    this.dataSet.maxHeight = this.maxHeight;

  }

  //function to generate xAxisLabels array
  //this may become a serivce
  getXLabels(data) {
    this.xStep = (this.lineWidth - this.leftOffset) / data.xlabels.length;
    console.log("x step : " + this.xStep);
    let xlabels = [];
    data.xlabels.forEach((item, index) => {
      xlabels.push({ x: this.leftOffset + this.xStep * (index), y: this.maxHeight + this.xLineBottomMargin, text: item });
    });
    xlabels.forEach(function (item, index, array) {
      console.log("dataSet.xlabels :", item, " ", index);
    })
    return xlabels;
  }

  getYLabels(data) {
    this.dataSet.numyYlabels = this.dataSet.numYlabels ? this.dataSet.numYlabels : 5;
    // data.series.forEach(function (item, index, array) {
    //   console.log("dataSet.series :", item, " ", index);
    // })

    let ylabels = [];
    this.maxNm = this.graphService.getMax(data);
    this.maxYval = this.maxNm;

    // round largest y value (maxNm) from dataSet.series.yval to nearest 100th for graph readability
    this.maxNm = Math.ceil(this.maxNm / 100) * 100;

    // interval between y axis : diving the max y axis value (maxNm) by the no. of labels (default 5)
    console.log("maxHeight: " + this.maxHeight);
    this.yStep = this.maxHeight / this.dataSet.numYlabels; //calculate y Axis intervals between y Axis labels (line height / number of Y labels)
    let yStepLabel = this.maxNm / this.dataSet.numYlabels; //calculate y Axis labels (Max Y Value / number of Y labels)
    
    //y labels are computed from the Y Values passed via dataSet.series.yval rounded to meaningful 100's
    console.log("rounding max y value to : " + this.maxNm.toString() + " dividing by numYlabels " + this.dataSet.numYlabels + " YStelLabel " + yStepLabel);

    for (var i = 0; i < this.dataSet.numYlabels; i++) {
      //ylabel x: is static for each ylabel (leftoffSet - yLineMargin) to plot label behind Y (horizontal) Axis
      //Ylabel y: increments in steps (steps = max value / array length) top of line = min Value e.g. 0, bottom of line = max value e.g. 300
      let yLegend = this.maxNm - (yStepLabel * i);
      ylabels.push({ x: this.leftOffset - this.ylineMargin, y: this.yStep * i, text: yLegend.toString() });
      console.log("yStep " + this.yStep);

    };
    return ylabels;
  }

  //May become a servive : called for all series of dataSet

  getxyPoints(data) {
    let xypoints = [];
    data.series.forEach((item, index) => {
      // console.log("item Type " + item.type);
      let seriesIndex = index;
      xypoints.push({ type: item.type, index: item.index, values: [] });
      item.yval.forEach((yval, index) => {
        // console.log("yvals " + yval);
        //call service normalise y
        let y = this.graphService.normaliseY(yval, this.maxNm, this.maxHeight);
        xypoints[seriesIndex].values.push({ item: { item: item, xlabel: data.xlabels[index] }, x: this.leftOffset + (this.xStep * (index)), y: y });
        // console.log("Y " + xypoints[seriesIndex].values[index].y);
        // console.log("line xypoints " + Object.values(xypoints[seriesIndex].values[index]));
      })
    });
    xypoints.forEach(function (item, index, array) {
      console.log("getPoints Item :", item, "getPoints Index : ", index);
    })
    return xypoints;

  }

  pointClicked(event): void {
    // console.log(event);
    this.pClicked.emit(event);

    // console.log("Point was clicked");
  }

  // get number of bar charts - to determine x pixel of bar chart / poistion of bar centered either side of grid line
  numBarCharts() {
    let numBarCharts: number = 0;
    this.dataSet.xypoints.forEach(item => {
      if (item.type === 'bar') {
        numBarCharts++;
      }
    })

    return numBarCharts;
  }

  addBlanksStartChart() {
    
      this.dataSet.data.xlabels.unshift("");
      this.dataSet.data.series.forEach((series, index) => {
        this.dataSet.data.series[index].yval.unshift(0);
      })
  }

  ngOnInit() {
    console.log("*******************DataSet Being generated **********************");
    console.log(this.dataSet);
    if (this.dataSet) {
      this.addBlanksStartChart();
      //call function to populated dataSet array which will be rendered 
      this.generateDataSet();
    }

    //sample timeout to show how graph data could be updated dynamically - this is where updates can be added pulled in
    // setTimeout( () => {
    //   this.dataSet.data = getLatestData();
    //  this.generateDataSet(this.dataSet);
    // },10000)
  }
}
