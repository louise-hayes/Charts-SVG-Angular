import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgSwitch } from '@angular/common';

@Component({
  selector: 'g[app-bar-chart]',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit {
  @Input() dataSet: any;
  @Output() pClicked: EventEmitter<string>;

  constructor() { }
  
 translateFunc(values){
   let barpoints = [];
   barpoints.push(values.x, (240 - values.y));
   return "translate(" + barpoints + ")";
 }

  ngOnInit() {
    console.log("bar " , this.dataSet);
  }

}
