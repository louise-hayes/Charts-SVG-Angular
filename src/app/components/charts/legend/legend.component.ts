import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GraphService } from '../../../services/graph.service';


@Component({
  selector: 'g[app-legend]',
  templateUrl: './legend.component.html',
  styleUrls: ['./legend.component.css']
})
export class LegendComponent implements OnInit {
  @Input() dataSet: any;

  constructor(private graphService: GraphService) { }

  translateLegendFunc(i) {
    let barxypoints = [];
    barxypoints.push("60", 15*i+20);
    // barxypoints.push(val.x + (20  * this.dataSet.data.series[this.seriesIndex].barIndex), (this.dataSet.maxHeight - val.y));

    return "translate(" + barxypoints + ")";

  }



  ngOnInit() {
  }

}
