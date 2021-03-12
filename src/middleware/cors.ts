import express, { Express } from 'express';
import cors from 'cors';

class Cors {
    public app: Express;

    /**
    * initalizing cors middleware
    */
    constructor() {
        this.app = express();
        this.app.use(cors({ origin: true }));
    }
}


const corsMiddleware: Express = new Cors().app;
export { corsMiddleware };
