import express from 'express';
import { userRoutes } from './user.routes';
import { patientRoutes } from './patient.route';
class Router {
    public router: express.Router;

    /**
     * router mapping to the modules
     */
    constructor() {
        this.router = express.Router();
        this.router.use('/user', userRoutes);
        this.router.use('/patient', patientRoutes);
    }
}

const router : express.Router = new Router().router;
export { router };
