import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})

export class ChartsComponent implements OnInit {
  dataSet: any ;
  offset: any;
  

  //x 30 y 50 places a circle on the line graph to plot the data
  constructor() {
    this.offset = 80;

    this.dataSet = {
      points: [
        { x: 5 + this.offset, y: 50, delta: -2, interval: null },
        { x: 100 + this.offset, y: 80, delta: -1, interval: null },
        { x: 200 + this.offset, y: 60, delta: 3, interval: null },
        { x: 280 + this.offset, y: 30, delta: 4, interval: null }
      ],
      xlabels: [
        { x: 5 + this.offset, y: 150, text: "Jan" },
        { x: 125 + this.offset, y: 150, text: "Feb" },
        { x: 185 + this.offset, y: 150, text: "March" },
        { x: 245 + this.offset, y: 150, text: "April" },
        { x: 305 + this.offset, y: 150, text: "May" }
      ],
      ylabels: [
        { x: this.offset - 5, y: 15, text: "100" },
        { x: this.offset - 5, y: 40, text: "80" },
        { x: this.offset - 5, y: 65, text: "60" },
        { x: this.offset - 5, y: 90, text: "40" },
        { x: this.offset - 5, y: 115, text: "20" }
      ],
      labelxTitle:
        { x: 150 + this.offset, y: 170, title: "Month" },

      labelyTitle:
        { x: 40, y: 70, title: "Users" },

      xline: // how long x horizontal line 60-360
        { x1: this.offset, x2: 300 + this.offset, y1: 130, y2: 130 },

      yline: //how long y vertical line 5 - 130
        { x1: this.offset, x2: this.offset, y1: 5, y2: 130 }

    }
  }

  //function to generate line path using x y variables from points array
  // output used to render svg d: path('M 30 50 L 100 80 L 200 60 L 280 30');
  linePath() {
    let pathParts = [], currentPoint, i;
    for (i = 0; i < this.dataSet.points.length; i++) {
      currentPoint = this.dataSet.points[i];
      pathParts.push(currentPoint.x + "," + currentPoint.y);
    }
    // console.log("M" + pathParts.join(" L"));
    // console.log(pathParts);

    //return "M 30 50 L 100 80 L 200 60 L 280 30"
    return "M" + pathParts.join(" L");

  }

  generateDataSet(dataSet:any) {
    console.log("generating DataSet");
    console.log(dataSet);
    let points = this.getPoints(dataSet.data);  
    

     




    return true;
  }

getPoints(dataSet) {
  let pointsObj = [];
  dataSet.forEach(data => {
     pointsObj.push("xlabel"+ data.key)
  });

  // { x: 30 + this.offset, y: 50, delta: -2, interval: null },
  // { x: 100 + this.offset, y: 80, delta: -1, interval: null },
  // { x: 200 + this.offset, y: 60, delta: 3, interval: null },
  // { x: 280 + this.offset, y: 30, delta: 4, interval: null }

}

  ngOnInit() {

  }


}
