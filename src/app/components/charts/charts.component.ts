import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { GraphService } from '../../services/graph.service';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})

export class ChartsComponent implements OnInit {
  @Input() dataSet: any;
  @Output() pClicked: EventEmitter<string>;
  position = 'before';//tooltip
  

  constructor(private graphService: GraphService) {
    this.pClicked = new EventEmitter();
  };
  

  pointClicked(event): void {
    this.pClicked.emit(event);

  }

  ngOnInit() {
    console.log("*******************Charts Component: DataSet Being generated **********************");
    console.log(this.dataSet);
  }
}
