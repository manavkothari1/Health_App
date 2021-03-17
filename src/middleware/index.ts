import express ,{Express} from 'express';
import { corsMiddleware } from './cors';
import { bodyParserMiddleware } from './body-parser';
import { helmetMiddleware } from './helmet';

class Middleware {
    public app: Express;

    /*
    * initalizing body parser and cookie parser middleware and making it common middleware
    */
    constructor() {
        this.app = express();
        this.app.use(corsMiddleware);
        this.app.use(bodyParserMiddleware);
        this.app.use(helmetMiddleware)
    }
}

const middleware : Express = new Middleware().app;
export { middleware };
