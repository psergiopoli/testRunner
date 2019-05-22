import { TestRunner } from "./TestRunner";


process.argv.forEach((val, index) => {
    console.log(index + ': ' + val);
});

const url = 'http://localhost:8080/hello';
// const url = 'http://localhost:3000';

const testRunner: TestRunner = new TestRunner(url, 10, 1000, 'GET', {}, {});

const hrStart = process.hrtime();

testRunner.run().then(executionTimes => {
    console.log('Complete');
    console.log('Execution Times:' + executionTimes.length);
    executionTimes.forEach(executionTime => {
        console.info('Execution time (hr): %ds %dms', executionTime[0], executionTime[1] / 1000000);
    });

    const hrEnd = process.hrtime(hrStart);
    console.info('Total Execution time (hr): %ds %dms', hrEnd[0], hrEnd[1] / 1000000);
});
