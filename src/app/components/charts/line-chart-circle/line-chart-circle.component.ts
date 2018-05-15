import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'g[app-line-chart-circle]',
  templateUrl: './line-chart-circle.component.html',
  styleUrls: ['./line-chart-circle.component.css']
})
export class LineChartCircleComponent implements OnInit {
  @Input() dataSet: any;
  @Input() seriesIndex: number;
  @Output() pClicked: EventEmitter<string>;

  constructor() { this.pClicked = new EventEmitter();  }
  //trigger event upon click 
  pointClicked(event,i): void {
    // this.pClicked.emit(event);
    var data = {
      "legend" : event.legend,
      "yval" : event.yval[i], 
      "xlabel" : this.dataSet.data.xlabels[i]
    };
    console.log("here");
    this.pClicked.emit(JSON.stringify(data));
    
  }

  getToolTipValues(seriesIndex, yindex, dataSet) {
    let toolTipVals = {};
    toolTipVals = dataSet.data.xlabels[yindex] + ' ' + dataSet.data.series[seriesIndex].legend + ' : ' +  + dataSet.data.series[seriesIndex].yval[yindex] + ' ' + dataSet.labels.yAxisID;

    return toolTipVals;

}

  ngOnInit() {
  }

}
