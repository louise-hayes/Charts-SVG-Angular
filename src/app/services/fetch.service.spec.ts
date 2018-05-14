import { FetchDataService } from './fetchdata.service';

describe('Service: FetchData', () => {
    let service: FetchDataService;

    beforeEach(() => {
        service = new FetchDataService();
    });

    afterEach(() => {
        service = null;
    });

    it('should return year 2013 from fetchData', () => {
        let i: Number = 2;
        let choice: String = "prev";
        let answer1 = service.fetchData(i,choice);
        console.log(answer1);
        expect(answer1.year).toContain(2013);
    });

    it('should return year 2014 from fetchData', () => {
        let i: Number = 2;
        let choice: String = "next";
        let answer1 = service.fetchData(i,choice);
        console.log(answer1);
        expect(answer1.year).toContain(2014);
    });

    it('should return year 2014 from fetchData', () => {
        let i: Number = 5;
        let choice: String = "next";
        service.currentYear = 5;
        let answer2 = service.fetchData(i,choice);
        console.log(answer2);
        expect(answer2.year).toContain(2017);
    });
});