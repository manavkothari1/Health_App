import express, { Express } from 'express';
import helmet from 'helmet';

class Helmet {
    public app: Express;

    /**
    * initalizing cors middleware
    */
    constructor() {
        this.app = express();
        this.app.use(helmet());
    }
}


const helmetMiddleware: Express = new Helmet().app;
export { helmetMiddleware };