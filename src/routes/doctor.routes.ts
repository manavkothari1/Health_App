import express from 'express';
import { DoctorController } from '../controllers/doctor.controller';

class DoctorRoutes {
    public doctorRouter: express.Router;

    /**
     * routes mapping to the user apis
     */
    constructor() {
        this.doctorRouter = express.Router();
        this.doctorRouter.post('/', DoctorController.addDoctor);
        this.doctorRouter.get('/', DoctorController.getDoctors);
        this.doctorRouter.get('/:id', DoctorController.getDoctorById);
        this.doctorRouter.put('/:id', DoctorController.updateDoctorById);
    }
}


const doctorRoutes : express.Router = new DoctorRoutes().doctorRouter;
export { doctorRoutes };

