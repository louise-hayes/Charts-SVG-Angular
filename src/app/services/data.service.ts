import { Injectable } from '@angular/core';

@Injectable()

export class DataService {
    currentYear: number = 0;

    fetchData(index, choice) {
        if (choice === 'next') {this.currentYear++;}
        else if (choice === 'prev') {this.currentYear--;};
        if (this.currentYear < 0) { this.currentYear = 0 }
        if (this.currentYear > 5) { this.currentYear = 5 }


        let series:object=
            [{
                year: "2017", data:
                [
                    { legend: "Red trucks", type: "line", stroke: "red", "strokewidth": "1", "strokedasharray": "5,5", yval: [920, 300, 400, 300, 200, 100] },
                    { legend: "Blue trucks", type: "line", stroke: "blue", "strokewidth": "1", "strokedasharray": "0", yval: [50, 250, 350, 450, 350, 250] }

                ]
            },
                {
                    year: "2016", data:
                    [
                        { legend: "Red trucks", type: "line", stroke: "red", "strokewidth": "1", "strokedasharray": "5,5", yval: [100, 200, 300, 400, 500, 600] },
                        { legend: "Blue trucks", type: "line", stroke: "blue", "strokewidth": "1", "strokedasharray": "0", yval: [20, 150, 950, 850, 650, 550] }

                    ]
                },
                {
                    year: "2015", data:
                    [
                        { legend: "Red trucks", type: "line", stroke: "red", "strokewidth": "1", "strokedasharray": "5,5", yval: [920, 300, 400, 300, 200, 100] },
                        { legend: "Blue trucks", type: "line", stroke: "blue", "strokewidth": "1", "strokedasharray": "0", yval: [50, 250, 350, 450, 350, 250] }

                    ]
                },
                {
                    year: "2014", data:
                    [
                        { legend: "Red trucks", type: "line", stroke: "red", "strokewidth": "1", "strokedasharray": "5,5", yval: [100, 200, 300, 400, 500, 600] },
                        { legend: "Blue trucks", type: "line", stroke: "blue", "strokewidth": "1", "strokedasharray": "0", yval: [50, 250, 350, 450, 350, 250] }

                    ]
                },
                {
                    year: "2013", data:
                    [
                        { legend: "Red trucks", type: "line", stroke: "red", "strokewidth": "1", "strokedasharray": "5,5", yval: [920, 300, 400, 300, 200, 100] },
                        { legend: "Blue trucks", type: "line", stroke: "blue", "strokewidth": "1", "strokedasharray": "0", yval: [50, 250, 350, 450, 350, 250] }

                    ]
                }


            ]

        let mockData = series[this.currentYear];
        return mockData;

    }


}
