import express, {Express} from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';

class BodyParser {
    public app: Express;

    /**
    * initalizing body parser and cookie parser middleware
    */
    constructor() {
        this.app = express();
        this.app.use(cookieParser());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(bodyParser.json());
    }
}

const bodyParserMiddleware :Express = new BodyParser().app;
export { bodyParserMiddleware };
