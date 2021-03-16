import express from 'express';
import { DoctorController } from '../controllers/doctor.controller';

class DoctorRoutes {
    public doctorRouter: express.Router;

    /**
     * routes mapping to the user apis
     */
    constructor() {
        this.doctorRouter = express.Router();
        this.doctorRouter.get('/', DoctorController.getDoctorUser);
    }
}


const doctorRoutes : express.Router = new DoctorRoutes().doctorRouter;
export { doctorRoutes };

