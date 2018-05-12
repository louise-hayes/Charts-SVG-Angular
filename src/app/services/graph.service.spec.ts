import { GraphService } from './graph.service';

describe('Service: Graph', () => {
    let service: GraphService;

    beforeEach(() => {
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

    it('should return from getXlabels', () => {
        let mockData: object = {
            xlabels: [{}]
        };
        let answer = service.getXLabels(mockData);
        console.log("answer" , answer);
        expect(answer).toEqual([{x:50, y:270, text:{}}]);
    });
});