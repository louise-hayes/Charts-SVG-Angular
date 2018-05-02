import { Injectable } from '@angular/core';

@Injectable()
export class GraphService {
    yvalsArray: any;
    constructor() {

    }

    // caclulate the max value of an array of an array of numbers
    // series: [
    //     { type: "line", stroke: "red", "stroke-width": "1", "strokedasharray": "5,5" , legend: 2016, yval: [100, 300, 400, 300, 200, 100] },
    //     { type: "line", stroke: "blue", "stroke-width": "1", "strokedasharray": "0", legend: 2017, yval: [150, 250, 350, 450, 350, 250] },
    //     { type: "bar", legend: 2018, yval: [125, 275, 375, 275, 175, 100] }

    // E.G. get max Y value from a series of data, to determine max height of y axis

    getMax(dataArray) {
        console.log("in service getMax");
        this.yvalsArray = dataArray;
        let m = 0;
        this.yvalsArray.series.forEach(item => {
            console.log("ite " + Math.max.apply(null, item.yval));
            if (Math.max.apply(null, item.yval) > m) {
                m = Math.max.apply(null, item.yval);
            }
        });
        console.log("max Y axis Value (Max Nm : " + m);
        return m;

    }

    Path(index, dataSet) {
        let path = [], currentPoint, i;
        if (dataSet.points[index].type === 'line') {
            for (i = 0; i < dataSet.points[index].values.length; i++) {
                currentPoint = dataSet.points[index].values[i];
                path.push(currentPoint.x + "," + currentPoint.y);
            }
            //returns "M 30 50 L 100 80 L 200 60 L 280 30"
            return "M" + path.join(" L");
        }

    }

    linePath(data) {
        let pathParts = [], currentPoint, i;
        for (i = 0; i < data.values.length; i++) {
            currentPoint = data.values[i];
            pathParts.push(currentPoint.x + "," + currentPoint.y);
        }

        // console.log("M" + pathParts.join(" L"));
        // console.log(pathParts);
        return "M" + pathParts.join(" L");
        //returns "M 30 50 L 100 80 L 200 60 L 280 30"

    }
// takes in a value, a max value and a max height
// returns y pixel of horizontal axis, for that y value, 
// as a percentage of the max value 

normaliseY(val, max, maxHeight){
    let n = (maxHeight - (maxHeight / (max / val)));
    return n;
}

    setStyles(i, dataSet) {
        let styles : any;
        //for line graph

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
        }

        return styles;
    }

}