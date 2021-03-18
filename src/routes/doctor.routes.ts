import express from 'express';
import { DoctorController } from '../controllers/doctor.controller';
import { Validator } from '../utils/validator/Validator';

class DoctorRoutes {
    public doctorRouter: express.Router;

    /**
     * routes mapping to the user apis
     */
    constructor() {
        this.doctorRouter = express.Router();
        this.doctorRouter.post('/',Validator.patientValidator, DoctorController.addDoctor);
        this.doctorRouter.get('/',Validator.paginationValidator, DoctorController.getDoctors);
        this.doctorRouter.get('/:id',Validator.idValidator, DoctorController.getDoctorById);
        this.doctorRouter.put('/:id',Validator.idValidator, Validator.doctorUpdateValidator, DoctorController.updateDoctorById);
    }
}


const doctorRoutes : express.Router = new DoctorRoutes().doctorRouter;
export { doctorRoutes };

