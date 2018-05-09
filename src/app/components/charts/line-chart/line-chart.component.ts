import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'g[app-line-chart]',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnInit {
  @Input() seriesIndex: any;
  @Input() dataSet: any;

  @Output() pClicked: EventEmitter<string>;

  constructor() { this.pClicked = new EventEmitter(); }
  
  
  //take in x,y pixels and return svg path
  //returns "M 30 50 L 100 80 L 200 60 L 280 30"
  linePath(xypoints) {
    let pathParts = [], currentPoint, i;
    for (i = 0; i < xypoints.values.length; i++) {
      currentPoint = xypoints.values[i];
      pathParts.push(currentPoint.x + "," + currentPoint.y);
    }
    // console.log("M" + pathParts.join(" L"));
    // console.log(pathParts);
    return "M" + pathParts.join(" L");


  }

  setStyles(i, dataSet) {
    //for line graph
    let styles = {
      stroke: this.dataSet.data.series[i].stroke, //color of line
      "stroke-width": this.dataSet.data.series[i].strokewidth, //0 thin, 6=thicker line
      "stroke-dasharray": this.dataSet.data.series[i].strokedasharray // 0 = continous line
    }
    return styles;
  }
  //trigger event upon cicrle/point click 
  pointClicked(event): void {
    this.pClicked.emit(event);
  }


  ngOnInit() {
    console.log("line-chart ", this.dataSet);

  }

}
