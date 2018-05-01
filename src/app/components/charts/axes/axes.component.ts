import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GraphService } from '../../../services/graph.service';


@Component({
  selector: 'g[app-axes]',
  templateUrl: './axes.component.html',
  styleUrls: ['./axes.component.css']
})
export class AxesComponent implements OnInit {
  @Input() dataSet: any;
  @Input() index: any;

  constructor() { }

  ngOnInit() {
  }

}
