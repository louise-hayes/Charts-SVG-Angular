import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgSwitch } from '@angular/common';
import { GraphService } from '../../../services/graph.service';

@Component({
  selector: 'g[app-bar-chart]',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit {
  @Input() dataSet: any;
  @Input() series: any;
  @Input() index: any;

  @Output() pClicked: EventEmitter<string>;

  barcnt: any = 0;
  oldCountValue: Number = 0;

  constructor(private graphService: GraphService) { }

  translateFunc(values) {

      this.barcnt=2;

      let barpoints = [];
      barpoints.push(values.x + (20  * this.series.index), (240 - values.y));
      return "translate(" + barpoints + ")";
    }


    ngOnInit() {
      console.log("bar ", this.series);
    }

  }
