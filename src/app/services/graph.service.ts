import { Injectable } from '@angular/core';

@Injectable()
export class GraphService {

    leftOffset: number = 50; // leftmargin for Y Axis Main Label 
    ylineMargin: number = 5;
    lineWidth: number = 500;
    chartStyle: object;
    legendStyle: object;
    labelStyle: object;
    axisLabelStyle: object;
    xLineBottomMargin: number = 20;
    xLabelMargin: number = 60;
    leftMargin: number = 5;
    yStep: number;
    maxNm: number;
    maxYval: number;
    maxHeight: number = 250;
    rightMargin: number = 5;
    ylabelMargin: number = 10;
    yvalsArray: any;
    legendOffset: number = 70;
    legendYoffset: number = 40;
    constructor() {

    }

    // caclulate the max value of an array of an array of numbers
    // series: [
    //     { type: "line", stroke: "red", "stroke-width": "1", "strokedasharray": "5,5" , legend: 2016, yval: [100, 300, 400, 300, 200, 100] },
    //     { type: "line", stroke: "blue", "stroke-width": "1", "strokedasharray": "0", legend: 2017, yval: [150, 250, 350, 450, 350, 250] },
    //     { type: "bar", legend: 2018, yval: [125, 275, 375, 275, 175, 100] }

    // E.G. get max Y value from a series of data, to determine max height of y axis

    getMax(dataArray) {
        let yvalsArray = dataArray;
        let m = 0;
        yvalsArray.series.forEach(item => {
            // console.log("ite " + Math.max.apply(null, item.yval));
            if (Math.max.apply(null, item.yval) > m) {
                m = Math.max.apply(null, item.yval);
            }
        });
        console.log("Max Nm : " + m);
        return m;

    }

    // takes in a y value, a max y value and a max graph height
    // returns y pixel of horizontal axis for that y value, 
    // which is determined by evaluating y val as a percentage of the max value 

    normaliseY(val, max, maxHeight) {
        let n = (maxHeight - (maxHeight / (max / val)));
        return n;
    }

    setStyles(i, dataSet) {
        let styles: any;

        if (dataSet.data.series[i].type === "line") {
            styles = {
                stroke: dataSet.data.series[i].stroke, //color of line
                "stroke-width": dataSet.data.series[i].strokewidth, //0 thin, 6=thicker line
                "stroke-dasharray": dataSet.data.series[i].strokedasharray // 0 = continous line
            }
        }
        else if (dataSet.data.series[i].type === "bar") {
            styles = {
                fill: dataSet.data.series[i].fill //color of bar

            }
        } else if (dataSet.data.series[i].type === "donut") {
            styles = {
                fill: dataSet.data.series[i].fill
            }
        }

        return styles;
    }


    getXLabels(data) {
        data.xStep = (this.lineWidth - this.leftOffset) / data.xlabels.length;
        console.log("x step : " + data.xStep);
        let xlabels = [];
        data.xlabels.forEach((item, index) => {
            xlabels.push({ x: this.leftOffset + data.xStep * (index), y: this.maxHeight + this.xLineBottomMargin, text: item });
        });
        // xlabels.forEach(function (item, index, array) {
        //     console.log("dataSet.xlabels :", item, " ", index);
        // })
        return xlabels;
    }

    getYLabels(dataSet) {
        let ylabels = [];
        this.maxNm = this.getMax(dataSet.data);
        this.maxYval = this.maxNm;

        // round largest y value (maxNm) from dataSet.series.yval to nearest 100th for graph readability
        this.maxNm = Math.ceil(this.maxNm / 100) * 100;
        if (this.maxNm === this.maxYval) {
            this.maxNm = (this.maxNm + 100);
        }
        // interval between y axis : diving the max y axis value (maxNm) by the no. of labels (default 5)
        console.log("maxHeight: " + this.maxHeight);
        this.yStep = this.maxHeight / dataSet.numYlabels; //calculate y Axis intervals between y Axis labels (line height / number of Y labels)
        let yStepLabel = this.maxNm / dataSet.numYlabels; //calculate y Axis labels (Max Y Value / number of Y labels)

        //y labels are computed from the Y Values passed via dataSet.series.yval rounded to meaningful 100's
        console.log("rounding max y value to : " + this.maxNm.toString() + " dividing by numYlabels " + dataSet.numYlabels + " YStelLabel " + yStepLabel);

        for (var i = 0; i < dataSet.numYlabels; i++) {
            //ylabel x: is static for each ylabel (leftoffSet - yLineMargin) to plot label behind Y (horizontal) Axis
            //Ylabel y: increments in steps (steps = max value / array length) top of line = min Value e.g. 0, bottom of line = max value e.g. 300
            let yLegend = this.maxNm - (yStepLabel * i);
            ylabels.push({ x: this.leftOffset - this.ylineMargin, y: this.yStep * i, text: yLegend.toString() });
            console.log("yStep " + this.yStep);

        };
        return ylabels;
    }

    //May become a servive : called for all series of dataSet

    getxyPoints(data) {
        let xypoints = [];
        data.series.forEach((item, index) => {
            // console.log("item Type " + item.type);
            let seriesIndex = index;
            xypoints.push({ type: item.type, index: item.index, values: [] });
            item.yval.forEach((yval, index) => {
                // console.log("yvals " + yval);
                //call service normalise y
                let y = this.normaliseY(yval, this.maxNm, this.maxHeight);
                xypoints[seriesIndex].values.push({ item: { item: item, xlabel: data.xlabels[index] }, x: this.leftOffset + (data.xStep * (index)), y: y });
                // console.log("Y " + xypoints[seriesIndex].values[index].y);
                // console.log("line xypoints " + Object.values(xypoints[seriesIndex].values[index]));
            })
        });
        // xypoints.forEach(function (item, index, array) {
        //     console.log("getPoints Item :", item, "getPoints Index : ", index);
        // })
        return xypoints;

    }
    // get number of bar charts - to determine x pixel of bar chart / poistion of bar centered either side of grid line
    numBarCharts(dataSet) {
        let numBarCharts: number = 0;
        if (dataSet.xypoints) {
            dataSet.xypoints.forEach(item => {

                if (item.type === 'bar') {
                    numBarCharts++;
                }
            })
            return numBarCharts;
        }
        else {
            return 0;
        }

    }

    addBlanksStartChart(dataSet) {
        //add one set of blank vals to move everything over one step, to start first real y value after 0
        if (dataSet.data && dataSet.data.xlabels && dataSet.data.series) {
            dataSet.data.xlabels.unshift("");
            dataSet.data.series.forEach((series, index) => {
                dataSet.data.series[index].yval.unshift(0);
            });
        }
        return dataSet;
    }


    generateDataSet(dataSet) {
        console.log("-----graphService.generate DataSet------")
        //first add blank vals to first x,y points to ensure they are placed after the start, i.e. one step after 0,0 
        dataSet = this.addBlanksStartChart(dataSet);
        //set numbYlables on Y axis to default 5 of none specified
        dataSet.numyYlabels = dataSet.numYlabels ? dataSet.numYlabels : 5;
        //set height, will default to charts.component.css if none specified. 
        if (dataSet.style["height.px"] && !(Number.isNaN(dataSet.style["height.px"])) ) {
            this.maxHeight = parseInt(dataSet.style["height.px"]) - this.xLabelMargin;
            this.lineWidth = parseInt(dataSet.style["width.px"]) - 30;
        }
        else {

        }

        this.chartStyle = dataSet.style;
        this.legendStyle = dataSet.legendStyle;
        this.labelStyle = dataSet.labelStyle;
        this.axisLabelStyle = dataSet.axisLabelStyle;
        dataSet.ylabels = this.getYLabels(dataSet);
        dataSet.xlabels = this.getXLabels(dataSet.data);
        dataSet.xypoints = this.getxyPoints(dataSet.data);
        dataSet.xline = { x1: this.leftOffset, x2: this.lineWidth, y1: this.maxHeight, y2: this.maxHeight };
        dataSet.yline = { x1: this.leftOffset, x2: this.leftOffset, y1: this.maxHeight, y2: 0 }
        dataSet.labelxTitle = { x: this.lineWidth / 2, y: this.maxHeight + this.xLabelMargin, title: dataSet.labels.xAxisID };
        dataSet.labelyTitle = { x: this.ylabelMargin, y: this.maxHeight / 2, title: dataSet.labels.yAxisID };
        dataSet.maxHeight = this.maxHeight;
        dataSet.legendOffset = this.legendOffset;
        dataSet.legendYoffset = this.legendYoffset;

        console.log("graphService : finished generating dataSet ******");
        // console.log(JSON.stringify(dataSet));

        return dataSet;

    }
}