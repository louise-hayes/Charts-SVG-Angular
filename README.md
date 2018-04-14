# Angular5ChartsSvg2
Angular5 SVG Charts from scratch

This angular charts app contains no thrid party chart dependencies (such as d3, ngs-charts or highcharts).

## Git: https://github.com/louise-hayes/svgcharts.git

![screen shot 2018-04-14 at 16 52 29](https://user-images.githubusercontent.com/29293985/38772440-a65a0e4a-4004-11e8-8654-81c6c56adde3.png)

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
    ChartComponent
    
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
