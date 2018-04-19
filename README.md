# Angular5ChartsSvg2
Angular5 SVG Charts from scratch

This angular5 charts app contains no thrid party chart dependencies (such as chart.js, d3.js, ngx-charts or highcharts).

## Git: https://github.com/louise-hayes/svgcharts.git

![screen shot 2018-04-17 at 12 46 51](https://user-images.githubusercontent.com/29293985/38884395-7eb4b63e-423d-11e8-92a8-e28e9ea228f1.png)

## To launch: 
```npm install```
```ng serve```

# Add the chart components to your app:


### Import the component
- In Parent ```app.module.ts``` 

```
import { ChartsComponent } from './components/charts/charts.component';
```


### Add the component to NgModule declarations:
```
@NgModule({
  declarations: [
    AppComponent,
    ChartsComponent
    
  ],
```



### Define and assign dataSet object values
- In Parent ```app.component.ts``` which will use the chart component


```
export class AppComponent {
chartStyle = {
    "height.px": 400,
    "width.px": 600,
    "font-family": "Arial"
  };

  lineStyle = {
    stroke: "red",
    "stroke-width": "1", //6=thicker
    "stroke-dasharray": "5,5" // 0 = continous line
  }

  labelStyle = {
    color: "#0000FF"
  }

  chartData = [
    { xlabel: "Jan", value: 1234 },
    { xlabel: "Feb", value: 745 },
    { xlabel: "March", value: 300 },
    { xlabel: "April", value: 50 },
    { xlabel: "May", value: 400 },
    { xlabel: "June", value: 600 },
    { xlabel: "July", value: 156 },
    { xlabel: "Aug", value: 236 },
    { xlabel: "Sept", value: 119 },
    { xlabel: "Oct", value: 234 },
  ];


  dataSet = {
    type: 'line',
    title: 'Demo Line Graph',
    labels: { xAxisID: 'Users', yAxisID: 'Months' }, //optional 
    data: this.chartData,
    style: this.chartStyle,
    lineStyle: this.lineStyle,
    labelStyle: this.labelStyle
  }
}

```


### Invoke the <app-charts> module with previously created dataSet atrribute
In parent ```app.component.html```

```
<app-charts [dataSet]="dataSet"></app-charts>
```


# Alternatively use the npm package:
### Import as an npm package
```npm i chart-angular5```

- In Parent ```app.module.ts``` 
```import { ChartsComponent } from 'import { ChartsComponent } from 'chart-angular5';```
- Add the component to NgModule imports:

```
imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    ChartsComponent
]
```

## noramlisation of axis 
Used an algorithim based on dataSet values, and followed below graph rules such as, 
 - there should be a given number of y labels provided and assumption this would be 5 or 10 ticks on y axis, to make it legible and evenly divided
 - the Y axis labels are auto generated from the passed in dataSet values and should be nice (round numbers etc) , there the labels are calculated by rounding the max y value to nearest 100th and dividing by number of y labels required.
 - it assumes 0 is the min value and plots the max value based on data set values provided
 y axis ticks will be spaced between these min (0) and max points based on the number of y labels required, and the height.
 - it plots all the x values (loops through all dataSet.length).
 - it plots the x values using the width / data set length as the steps between x values
 - margins and offsets are included in the algorithim to ensure there is enough space for labels and margins,  and the space remaining is where the graph is plotted.
- graph plot points are based on the xStep value combined and y values related to the max value and the height. e.g. with Feb having 745 as a value: 
Y point = maxHeight (240) - (maxHeight (240)/ (maxNm 1300 / y value(745)) = y = 102 

# Pass data to charts component via dataSet object: 
contains information to create graph element attributes such as:
### dataset.points: creates the chart line:
 <path d:"M 30 50 L 100 80 L 200 60 L 280 30"></path>
 You can use <path> it to create lines, curves, arcs and more.
https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Paths
The shape of a path element is defined by one attribute: 

`M` = Move to and Start line from : x30,y50 coordinates
`L` = draws a line from current (x30,y50) to x100 y80 etc
`fill stroke` (colour) and `stroke-width` (number / e.g. 2) are also part of path but are defined as class .chart-line in css

* `dataSet.xlabels`  : horizontal X Axis legends
* `dataSet.ylabels`  : vertical Y Axis legends
* `dataSet.xline` : horizontal X Axis line from position x1,x2 to y1,y2 (x Axis will have same value for x1 and x2)
* `dataSet.yline` : vertical Y Axis line from position x1,x2 to y1,y2 (y Axis will have same value for y1, y2) 
* `dataSet.labelStyle` : 
* `dataSet.lineStyle` :
* ` dataSet.chartStyle`:
All styles are optional, component provides defaults - if passing params, they will overwrite component css styles, and must be valid css key value pairs

### `dataSet` object is populated via the `generateDataSet()` method

### Sample of `dataSet` object generated dynamically using values from `Input() dataSet` 



```
this.dataSet = {
      points: [
        { x: this.leftOffset, y: 300 - 300 },
        { x: this.step + this.leftOffset, y: 300 - 100},
        { x: this.step * 2 + this.leftOffset, y: 300 - 60},
        { x: this.step * 3 + this.leftOffset, y: 300 - 200},
        { x: this.step * 4 + this.leftOffset, y: 300 - 250}
      ],
      xlabels: [
        { x: this.ylineMargin + this.leftOffset, y: this.yLineTop + this.xLineBottomMargin, text: "Jan" },
        { x: this.step + this.leftOffset, y: this.yLineTop + this.xLineBottomMargin, text: "Feb" },
        { x: this.step * 2 + this.leftOffset, y: this.yLineTop + this.xLineBottomMargin, text: "March" },
        { x: this.step * 3 + this.leftOffset, y: this.yLineTop + this.xLineBottomMargin, text: "April" },
        { x: this.step * 4 + this.leftOffset, y: this.yLineTop + this.xLineBottomMargin, text: "May" }
      ],
      ylabels: [
        { x: this.leftOffset - this.ylineMargin, y: 300 - 300, text: "300" },
        { x: this.leftOffset - this.ylineMargin, y: 300 - 240, text: "240" },
        { x: this.leftOffset - this.ylineMargin, y: 300 - 180, text: "180" },
        { x: this.leftOffset - this.ylineMargin, y: 300 - 120, text: "120" },
        { x: this.leftOffset - this.ylineMargin, y: 300 - 60, text: "60" },
        { x: this.leftOffset - this.ylineMargin, y: this.yLineTop, text: "0" }

      ],
      labelxTitle:
        { x: this.lineWidth / 2 + this.leftOffset, y: this.yLineTop + this.xLabelMargin, title: "Month" },

      labelyTitle:
        { x: this.leftOffset - 100, y: this.yLineTop / 2, title: "Users" },

      xline: // how long x horizontal Axis: `x1, x2` specify how long line is e.g. 60-360. `y1, y2` specify where line appears
        { x1: this.leftOffset, x2: this.lineWidth + this.leftOffset, y1: this.yLineTop, y2: this.yLineTop },

      yline: //how long y vertical line top is 5 bottom is chart height e.g. 300
        { x1: this.leftOffset, x2: this.leftOffset, y1: this.yLineTop, y2: 0 }

    }

```


## Y axis: 
![screen shot 2018-04-16 at 12 52 35](https://user-images.githubusercontent.com/29293985/38873502-e478989c-4223-11e8-926d-90f810364b5c.png)

e.g. Y label <text> 1300, 1040, 780, 520, 260. in above sample. max value (1234) rounded to nearest 100th (=1300) for legibility, divided by quantity Y labels required as specified in `dataSet.numYlabels`.

In the example shown,  Y label step/tick  'yStepLabel'  = 260. 
`let yStepLabel = this.maxNm / this.dataSet.numYlabels`
1300 / 5 = 260 (labels are "1300" - 260 = "1040", -260 = "780" etc).

`this.maxNm = Math.ceil(this.maxNm / 100) * 100;`






## Y-Axis ticks / Y labels: 

`this.yStep = this.maxHeight / this.dataSet.numYlabels`

dataSet.chartStyle.height(300) minus xLabelMargin(60)  = 240 , divided by  quantity Y labels (5) . This gives us the YStepLabel value of 48 : which is the intervals between Y positions. starting at y:0, add 48 each time to plot y ticks. 0, 48,96,144,192.




## x Axis ticks / X labels: 
![screen shot 2018-04-16 at 11 36 03](https://user-images.githubusercontent.com/29293985/38873504-e489d3e6-4223-11e8-9711-ec2beecf949b.png)

The X-Axis label <text>  is the chartData.xlabel specified in dataSet (Jan/feb/March in sample dataSet above etc), 
the quantity of xlabels is the dataSet length (10 in this case) 

`xlabels.push({ x: this.ylineMargin + this.leftOffset + this.xStep * index, y: this.maxHeight + this.xLineBottomMargin, text: item.xlabel });`


 x ticks are generated from the xStep which is the dataSet.chartStyle.width (600 ) minus leftOffset(150) = 450  divided by dataSet.length.(10) = 45.

X =  starting at `leftOffset` + `yLineMargin` (e.g. Jan = 155) + `xStep` (45) => Feb 200, + 45 => March 245 + 45 = April 290 etc

## x,y Points:
![screen shot 2018-04-16 at 11 36 01](https://user-images.githubusercontent.com/29293985/38873505-e49b60a2-4223-11e8-8c9c-5242eabf080b.png)

`points.push({ x: this.ylineMargin + this.leftOffset + (this.xStep * index), y: this.maxHeight - (this.maxHeight / (this.maxNm / item.value)) });`

X,Y <circle> points are calcualted using the xStep above (Jan 155, Feb 200, March 245 , April 290 etc) along with the y axis as it relates to the value
Y  : maxHeight  - (maxHeight / (maxNum / y value)  In the example of Feb having a value of 745 : 
Y : 240 - (240 / (1300/745)) = 102.46


This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.7.3.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
