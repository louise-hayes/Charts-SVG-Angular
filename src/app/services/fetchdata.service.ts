import { Injectable } from '@angular/core';

@Injectable()

export class FetchDataService {

    currentYear: number = 0;
    constructor() {

    }

    fetchData(choice) {
        if (choice === 'next') { this.currentYear++; }
        else if (choice === 'prev') { this.currentYear--; };
        if (this.currentYear < 0) { this.currentYear = 0 }
        if (this.currentYear > 4) { this.currentYear = 4 }

        //REST FETCH API to populate CMS analytics data
        // fetch(url, fetchParams)  
        //   .then(res => {
        //     // do something like return res.json();
        //   })

        //mockup for demo - this should be replaced by FETCH
        let series: object =
            [{
                year: "2013", data:
                    [
                        { legend: "Red trucks", type: "line", stroke: "red", "strokewidth": "1", "strokedasharray": "5,5", yval: [920, 300, 400, 300, 200, 100] },
                        { legend: "Blue trucks", type: "line", stroke: "blue", "strokewidth": "1", "strokedasharray": "0", yval: [50, 250, 350, 450, 350, 250] }

                    ]
            }, {
                year: "2014", data:
                    [
                        { legend: "Red trucks", type: "line", stroke: "red", "strokewidth": "1", "strokedasharray": "5,5", yval: [100, 300, 220, 307, 235, 600] },
                        { legend: "Blue trucks", type: "line", stroke: "blue", "strokewidth": "1", "strokedasharray": "0", yval: [90, 201, 329, 420, 250, 450] }

                    ]
            },
            {
                year: "2015", data:
                    [
                        { legend: "Red trucks", type: "line", stroke: "red", "strokewidth": "1", "strokedasharray": "5,5", yval: [100, 200, 300, 400, 500, 600] },
                        { legend: "Blue trucks", type: "line", stroke: "blue", "strokewidth": "1", "strokedasharray": "0", yval: [20, 150, 950, 850, 650, 550] }

                    ]
            },
            {
                year: "2016", data:
                    [
                        { legend: "Red trucks", type: "line", stroke: "red", "strokewidth": "1", "strokedasharray": "5,5", yval: [920, 300, 400, 300, 200, 100] },
                        { legend: "Blue trucks", type: "line", stroke: "blue", "strokewidth": "1", "strokedasharray": "0", yval: [50, 250, 350, 450, 350, 250] }

                    ]
            },
            {
                year: "2017", data:
                    [
                        { legend: "Red trucks", type: "line", stroke: "red", "strokewidth": "1", "strokedasharray": "5,5", yval: [100, 200, 300, 400, 500, 600] },
                        { legend: "Blue trucks", type: "line", stroke: "blue", "strokewidth": "1", "strokedasharray": "0", yval: [50, 250, 350, 450, 350, 250] }

                    ]
            },
            {
                year: "2018", data:
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
