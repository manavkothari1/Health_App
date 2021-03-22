import express, { Express, Request, Response, NextFunction } from 'express';
import { Server } from 'http';
import { router } from './routes';
import { middleware } from './middleware';
import {ErrorHandler} from './utils/responseHandler';

require('custom-env').env('test');

class App {
    public app: Express;
    public server: Server;
    private port: number | string | undefined;

    constructor() {
        /**
         * creating app instance
         */
        this.app = express();

        /**
         * initalizing middleware to app instance
         */
        this.app.use(middleware);

        /**
         * adding routes to the app
         */
        this.app.use(router);

        /**
         * Handling Errors
         */
        this.app.use(ErrorHandler.HandleError);
      
        /**
         * default route to check the server base url
         */
        this.app.use('/', (req: Request, res: Response, next: NextFunction) => {
            res.json({ message: 'SERVER CONNECTED' });
            next();
        });

        /**
         * server port
         */
        this.port = process.env.PORT;

        /**
         * server listing on default port 3000
         */
        this.server = this.app.listen(this.port, function () {
            console.log("server listening...", process.env.PORT)
        });
    }
}

// Creating the instance of app class
export default new App();
