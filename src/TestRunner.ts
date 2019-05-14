import axios from 'axios';

export class TestRunner {

    private url: string;
    private method: 'GET' | 'POST';
    private iterations: number;
    private batchSize: number;
    private body: any;
    private headers: any;

    constructor(url: string, iterations: number, batchSize: number, method: 'GET' | 'POST', body: any, headers: any) {
        this.url = url;
        this.iterations = iterations;
        this.batchSize = batchSize;
        this.method = method;
        this.body = body;
        this.headers = headers;

        console.log(this.iterations);
        console.log(this.batchSize);
    }

    async run() {
        const promises = [];
        const responses = [];
        const executionTimes = [];

        for (let j = 0; j < this.iterations; j++){
            const hrStart = process.hrtime();
            for (let i = 0; i < this.batchSize; i++) {
                promises.push(this.createPromise())
            }
            responses.push(...await Promise.all(promises));
            const hrEnd = process.hrtime(hrStart);
            executionTimes.push(hrEnd);
        }

        /*
        responses.forEach((response: AxiosResponse<any>) => {
            console.log(response.status);
        });
        */
       
        return executionTimes;
    }

    private createPromise(){
        if (this.method === 'GET') {
            return axios.get(this.url, { headers: this.headers });
        } else if (this.method === 'POST') {
            return axios.post(this.url, this.body, { headers: this.headers })
        }
    }

    
}