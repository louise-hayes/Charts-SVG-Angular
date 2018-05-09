import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'g[app-tooltip]',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.css']
})
export class TooltipComponent implements OnInit {
@Input() item : object;
  constructor() { 

  }
  ngOnInit() {
    this.showText();
  }

showText() {
console.log("tooltip " + this.item);  
}

}
