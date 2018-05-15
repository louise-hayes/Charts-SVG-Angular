import { GraphService } from './graph.service';

describe('Service: Graph', () => {
    let service: GraphService;
    
    beforeEach(() => {
    let leftOffset: number = 50;
    let ylineMargin: number = 5;
    let lineWidth: number = 500;
    let chartStyle: object;
    let legendStyle: object;
    let labelStyle: object;
    let axisLabelStyle: object;
    let xLineBottomMargin: number = 20;
    let xLabelMargin: number = 60;
    let leftMargin: number = 5;
    let yStep: number;
    let maxNm: number;
    let maxYval: number;
    let maxHeight: number = 250;
    let rightMargin: number = 5;
    let ylabelMargin: number = 10;
    let yvalsArray: any;
    let legendOffset: number = 70;
    let legendYoffset: number = 40;

        
        service = new GraphService();
    });

    afterEach(() => {
        service = null;
    });

    it('should return 80 from normaliseY', () => {
        let val: Number = 2;
        let maxHeight: Number = 100;
        let max: Number = 10;
        let answer = service.normaliseY(val, max, maxHeight);
        console.log(answer);
        expect(answer).toEqual(80);
    });

    it('should return 2 from numBarCharts', () => {
        let mockData: object = {
            xypoints: [{ type: "line" }, { type: "bar" }, { type: "bar" }, { type: "line" }]
        };
        let answer = service.numBarCharts(mockData);
        console.log(answer);
        expect(answer).toEqual(2);

    });
    it('should return 0 from numBarCharts if no bar charts in dataSet', () => {
        let mockData: object = {
            xypoints: [{ type: "line" }, { type: "line" }]
        };
        let answer = service.numBarCharts(mockData);
        console.log(answer);
        expect(answer).toEqual(0);
    });

    it('should return 0 from numBarCharts if empty dataSet', () => {
        let mockData: object = {

        };
        let answer = service.numBarCharts(mockData);
        console.log(answer);
        expect(answer).toEqual(0);
    });

    it('should return x: 50, y: 270 from getXlabels', () => {
        let mockData: object = {
            xlabels: [{}]
        };
        let answer = service.getXLabels(mockData);
        console.log("answer", answer);
        expect(answer).toEqual([{ x: 50, y: 270, text: {} }]);
    });
    it('should return stroke: "red" from setStyles', () => {
        let mockData: object = {
            data: {
                series: [
                    { type: "line", stroke: "red", "strokewidth": "1", "strokedasharray": "5,5" }
                ]
            }
        }

        let answer = service.setStyles(0,mockData);
        console.log("answer", answer);
        expect(answer).toEqual({ stroke: "red", "stroke-width": "1", "stroke-dasharray": "5,5" });
    });
    it('should return fill: "yellow" from setStyles', () => {
        let mockData: object = {
            data: {
                series: [
                    { type: "bar", fill: "yellow" }
                ]
            }
        }

        let answer = service.setStyles(0,mockData);
        console.log("answer", answer);
        expect(answer).toEqual({ fill: "yellow"});
    });
    it('should return fill: "yellow" from setStyles', () => {
        let mockData: object = {
            data: {
                series: [
                    { type: "donut", fill: "yellow" }
                ]
            }
        }
        let answer = service.setStyles(0,mockData);
        console.log("answer", answer);
        expect(answer).toEqual({ fill: "yellow"});
    });

    // it('should return height is a number from generateDataSet', () => {
    //     // let mockData: object = {
    //     //     style : {
    //     //         "height.px": 300
    //     //     }
    //     // };

    //     let chartData = {

    //         xlabels: ["Jan", "Feb", "March", "April", "May", "June"],
    //         series: [
    //           { legend: 2016, type: "line", stroke: "red", "strokewidth": "1", "strokedasharray": "5,5", yval: [100, 300, 400, 300, 200, 100] }
    //         //   { legend: 2017, type: "line", stroke: "blue", "strokewidth": "1", "strokedasharray": "0", yval: [150, 250, 350, 450, 350, 250] },
    //         //   { legend: 2018, type: "bar", barIndex: 0, fill: "yellow", yval: [100, 300, 400, 300, 200, 100] },
    //         //   { legend: 2019, type: "bar", barIndex: 1, fill: "red", yval: [150, 250, 350, 450, 350, 250] },
    //         //   { legend: 2020, type: "bar", barIndex: 2, fill: "orange", yval: [150, 250, 350, 450, 350, 250] },
      
      
    //         ]
    //       };
      
    //       let title = 'Angular5 Charts';
      
    //       let chartStyle = {
    //         "height.px": 300,
    //         "width.px": 500,
    //         "font-family": "Arial"
    //       };
      
    //       let labelStyle = {
    //         fill: "blue"
    //       }
      
    //       let axisLabelStyle = {
    //         fill: "red"
    //       }
    //       let xyPoints = [{
    //         type: "line",
    //         "values":
    //           [{item: {
    //                 item: { legend: 2017, type: "line", "z-index": 0, stroke: "blue", strokewidth: 1, strokedasharray: 0, yval: [0, 100, 250, 350, 450, 350, 250] },
    //                 xlabel: ""
    //               }, x: 50, y: 240
    //             }
    //           ]
    //         }
    //       ]
      
    //       let mockDataSet = {
    //         axis: true, //if line or bar must be true
    //         grid: true, //optional
    //         title: 'Usage',
    //         labels: { xAxisID: 'Months', yAxisID: 'Users' }, //optional 
    //         numYlabels: 5, //default to 5 if none provided - optimal 5 or 10
    //         data: this.chartData,
    //         xypoints:this.xyPoints,
    //         style: this.chartStyle, //all styles optional, component provides defaults - if passing params they will overwrite component and must be accurate css key value pairs
    //         labelStyle: this.labelStyle,
    //         legendStyle: this.legendStyle,
    //         legendTitle: "2013",
    //         barWidth: 40 //optional - advice 60 for 3 bar charts etc
    //       }
    //     let answer = service.generateDataSet(mockDataSet);
    //     console.log("answer", answer);
    //     expect(answer.maxHeight).toEqual(300);
    // });

});