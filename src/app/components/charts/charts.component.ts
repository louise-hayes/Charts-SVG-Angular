import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { GraphService } from '../../services/graph.service';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { LineChartComponent } from './line-chart/line-chart.component';
import { AxesComponent } from './axes/axes.component';
import { MatTooltip } from '@angular/material';
import {LegendComponent} from './legend/legend.component';
@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})

export class ChartsComponent implements OnInit {
  @Input() dataSet: any;
  @Output() pClicked: EventEmitter<string>;
  position = 'before';
  

  constructor(private graphService: GraphService) {
    this.pClicked = new EventEmitter();
  };
  

  pointClicked(event): void {
    this.pClicked.emit(event);

  }

  ngOnInit() {
    console.log("*******************DataSet Being generated **********************");
    console.log(this.dataSet);
  }
}
