import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GraphService } from '../../../services/graph.service';


@Component({
  selector: 'g[app-axes]',
  templateUrl: './axes.component.html',
  styleUrls: ['./axes.component.css']
})
export class AxesComponent implements OnInit {
  @Input() dataSet: any;
  @Input() labelStyle: any;

  constructor() { }

  //set css class to 'grid' to show grid if dataSet.grid = true
  getGridClass() {
    this.dataSet.gridChoice = this.dataSet.grid ? "grid" : "nogrid";
    return this.dataSet.gridChoice;
  }


  ngOnInit() {
  }

}
