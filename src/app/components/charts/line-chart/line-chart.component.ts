import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GraphService } from '../../../services/graph.service';

@Component({
  selector: 'g[app-line-chart]',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnInit {
  @Input() seriesIndex: any;
  @Input() dataSet: any;

  @Output() pClicked: EventEmitter<string>;

  constructor(private graphService: GraphService) { 
    // console.log(this.dataSet);
    this.pClicked = new EventEmitter(); 
  }
  
  
  //take in x,y pixels and return svg path
  //returns "M 30 50 L 100 80 L 200 60 L 280 30"
  linePath(xypoints) {
    let pathParts = [], currentPoint, i;
    for (i = 0; i < xypoints.values.length; i++) {
      currentPoint = xypoints.values[i];
      pathParts.push(currentPoint.x + "," + currentPoint.y);
    }
    return "M" + pathParts.join(" L");


  }
  //trigger event upon cicrle/point click 
  pointClicked(event): void {
    this.pClicked.emit(event);
  }


  ngOnInit() {
    console.log("line-chart ", this.dataSet);

  }


}
