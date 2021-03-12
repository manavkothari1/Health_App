import express from 'express';
import { userRoutes } from './user.routes';

class Router {
    public router: express.Router;

    /**
     * router mapping to the modules
     */
    constructor() {
        this.router = express.Router();
        this.router.use('/user', userRoutes);
    }
}

const router : express.Router = new Router().router;
export { router };
