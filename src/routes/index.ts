import express from 'express';
import { userRoutes } from './user.routes';
import { doctorRoutes  } from './doctor.routes';
import { patientRoutes  } from './patient.routes';

class Router {
    public router: express.Router;

    /**
     * router mapping to the modules
     */
    constructor() {
        this.router = express.Router();
        this.router.use('/user', userRoutes);
        this.router.use('/doctor', doctorRoutes);
        this.router.use('/patient', patientRoutes);
    }
}

const router : express.Router = new Router().router;
export { router };
