import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GraphService } from '../../../services/graph.service';

@Component({
  selector: 'g[app-bar-chart]',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit {
  @Input() dataSet: any;
  @Input() seriesIndex: number;
  @Input() numBarCharts: number;

  @Output() pClicked: EventEmitter<string>;

  constructor(private graphService: GraphService) {

  }

  //generate transform values for bar chart svg <rect> values
  //to do : normalise y values as percentage of y max height

  translateFunc(val, i) {
    let barxypoints = [];
    let startX = (this.getWidthBar()/2 * this.numBarCharts);
    barxypoints.push((val.x - startX) + (this.getWidthBar() * this.dataSet.data.series[this.seriesIndex].barIndex), val.y);
    return "translate(" + barxypoints + ")";
  }

  getWidthBar() {
    let barWidth = (this.dataSet.barWidth ? this.dataSet.barWidth : 60) / this.numBarCharts;
    
    return barWidth;
  }

  ngOnInit() {
    // console.log("bar xypoints", this.dataSet.xypoints[this.seriesIndex]);
  }

}
