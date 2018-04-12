# Angular5ChartsSvg2
Angular5 SVG Charts from scratch

### dataSet: 
contains information to create graph element attributes such as:
### dataset.points: creates the chart line:
 <path d:"M 30 50 L 100 80 L 200 60 L 280 30"></path>
 You can use <path> it to create lines, curves, arcs and more.
https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Paths
The shape of a path element is defined by one attribute: 

`M` = Move to and Start line from : x30,y50 coordinates
`L` = draws a line from current (x30,y50) to x100 y80 etc
`fill stroke` (colour) and `stroke-width` (number / e.g. 2) are also part of path but are defined as class .chart-line in css

### dataSet.xlabels
creates the horizontal line legends
### dataSet.ylabels
creates the vertical line legends

### dataSet.xline
creates the horizontal line from position x1,x2 to y1,y2 (xline will have same value for x1 and x2)
### dataSet.yline
creates the vertical line from position x1,x2 to y1,y2 (yline will have same value for y1, y2) 



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
