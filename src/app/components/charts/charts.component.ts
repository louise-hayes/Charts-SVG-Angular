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
  yLineTop: number;
  lineHeight: number;
  lineWidth: number;
  chartStyle: object;
  yLineBot: number;
  xLineBottomMargin: number;
  yLineMargin: number;
  yLineTopMargin: number;
  xLabelMargin: number;
  leftMargin: number;
  yminval: number;
  step: number;
  maxNm: number;
  maxYval : number;

  //x 30 y 50 places a circle on the line graph to plot the data
  constructor() {

    //the chartStyle will be populated from input() dataSet.chartStyle object
    //but will default to the below
    this.chartStyle = {
      "width.px": 500,
      "height.px": 600
    }

    this.leftOffset = 150;
    this.leftMargin = 40;
    this.ylineMargin = 5;
    this.yLineTop = 300;
    this.yLineBot = 5;
    this.lineWidth = this.chartStyle["width.px"];
    this.xLineBottomMargin = 20;
    this.yLineTopMargin = 20;
    this.xLabelMargin = 60;
    this.yminval = 0;
    this.step = 60;
    
    // to be dynamically created by Input() dataSetMain
    //dataSet populates graph, is rendered in the chart component html
    this.dataSet = {
      points: [ // Jan 
        { x: this.leftOffset, y: 300 - 300 },
        { x: this.step + this.leftOffset, y: 300 - 100 },
        { x: this.step * 2 + this.leftOffset, y: 300 - 60 },
        { x: this.step * 3 + this.leftOffset, y: 300 - 200 },
        { x: this.step * 4 + this.leftOffset, y: 300 - 250 }
      ],
      xlabels: [
        { x: this.ylineMargin + this.leftOffset, y: this.yLineTop + this.xLineBottomMargin, text: "Jan" },
        { x: this.step + this.leftOffset, y: this.yLineTop + this.xLineBottomMargin, text: "Feb" },
        { x: this.step * 2 + this.leftOffset, y: this.yLineTop + this.xLineBottomMargin, text: "March" },
        { x: this.step * 3 + this.leftOffset, y: this.yLineTop + this.xLineBottomMargin, text: "April" },
        { x: this.step * 4 + this.leftOffset, y: this.yLineTop + this.xLineBottomMargin, text: "May" }
      ],
      ylabels: [
        { x: this.leftOffset - this.ylineMargin, y: 300 - 300, text: "300" },
        { x: this.leftOffset - this.ylineMargin, y: 300 - 240, text: "240" },
        { x: this.leftOffset - this.ylineMargin, y: 300 - 180, text: "180" },
        { x: this.leftOffset - this.ylineMargin, y: 300 - 120, text: "120" },
        { x: this.leftOffset - this.ylineMargin, y: 300 - 60, text: "60" },
        { x: this.leftOffset - this.ylineMargin, y: this.yLineTop, text: "0" }

      ],
      labelxTitle:
        { x: this.lineWidth / 2 + this.leftOffset, y: this.yLineTop + this.xLabelMargin, title: "Month" },

      labelyTitle:
        { x: this.leftOffset - 100, y: this.yLineTop / 2, title: "Users" },

      xline: // how long x horizontal line: x1 x2 specify how long line is 60-360 y1 and y2 specify where line appears
        { x1: this.leftOffset, x2: this.lineWidth + this.leftOffset, y1: this.yLineTop, y2: this.yLineTop },

      yline: //how long y vertical line top is 5 bottom is chart height e.g. 300
        { x1: this.leftOffset, x2: this.leftOffset, y1: this.yLineTop, y2: 0 }

    }
    console.log(this.dataSetMain);
    console.log("constructor is being fired");
    // this.generateDataSet(this.dataSetMain);

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

  //function to generate graph dataset -  param dataSet received from parent App by Include()
  
  generateDataSet(dataSet: any) {
    console.log(this.dataSetMain);
    // this.chartStyle = this.dataSet.chartStyle;
    this.dataSet.ylabels = this.getYLabels(dataSet.data);
    this.yLineTop = this.maxYval;    
    this.dataSet.xlabels = this.getXLabels(dataSet.data);
    this.dataSet.points = this.getPoints(dataSet.data);
    this.dataSet.xline = { x1: this.leftOffset, x2: this.lineWidth + this.leftOffset, y1: this.yLineTop, y2: this.yLineTop };
    this.dataSet.yline = { x1: this.leftOffset, x2: this.leftOffset, y1: this.yLineTop, y2: 0 }
    console.log(this.dataSet);
    return true;//for unit test
  }

  //function to generate xAxisLabels array
  getXLabels(data) {
    let xlabels = [];
    data.forEach((item, index) => {
      xlabels.push({ x: this.ylineMargin + this.leftOffset + this.step * index, y: this.yLineTop + this.xLineBottomMargin, text: item.xlabel });
      console.log("xlabels " + xlabels);
    });
    return xlabels;
    // dataSet.forEach(function (data,index) {
    //   xlabels.push({ x: this.ylineMargin + this.leftOffset + (this.step * index), y: this.yLineTop + this.xLineBottomMargin, text: data.xlabel });
    //   console.log(xlabels);
    // });
  }

  getYLabels(data) {
    console.log(data);
    function getMax() {
      let maxNum = 0
      data.forEach(item => {
        if (item.value > maxNum) {
          maxNum = item.value;
        }
      });
      console.log(maxNum);
      return maxNum;
    }
    let ylabels = [];
    // let maxNum = 300;
    // maxNum = Math.max(dataSet.value);
    //   maxNum = dataSet.data.reduce(function(a, b) {
    //     return Math.max(a, b);
    // });

    this.maxNm = getMax();
    this.maxYval = this.maxNm;
    this.maxNm = Math.ceil(this.maxNm / 100) * 100;

    //function roundup maxNm 

    this.step = this.maxNm / data.length;


    console.log(this.maxNm.toString() + "length " + data.length);


    data.forEach((item, index) => {
      //text for Ylabel is computed from the Y Values passed via dataSet.value
      //YLabel x: static for each label, leftoffSet - yLineMargin to plot lable behind Y Line
      //YLabel y: increments in steps (steps = max value / array length) top of line = min Value e.g. 0, bottom of line = max value e.g. 300
      let num = this.maxNm - (this.step * index);
      ylabels.push({ x: this.leftOffset - this.ylineMargin, y: this.step * index, text: num.toString() });
      console.log("ylabel " + ylabels);

    });
    return ylabels;


  }


  getPoints(data) {
    let pointsT = [];
    data.forEach((item, index) => {
      pointsT.push({ x: this.ylineMargin + this.leftOffset + (this.step * index), y: this.maxYval - item.value });
      console.log("pointsT " + pointsT[index].y);
    });
    return pointsT;
  }

  ngOnInit() {
    console.log("ngOnInit is being fired");
    console.log(this.dataSetMain);
    this.generateDataSet(this.dataSetMain);
  }
}
