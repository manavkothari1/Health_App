import express from 'express';
import { DoctorController } from '../controllers/doctor.controller';
import { Validator } from '../utils/validator/Validator';
import {JwtToken} from '../utils/auth';

class DoctorRoutes {
    public doctorRouter: express.Router;

    /**
     * routes mapping to the user apis
     */
    constructor() {
        this.doctorRouter = express.Router();
        this.doctorRouter.use(JwtToken.checkJwt);
        this.doctorRouter.post('/',Validator.doctorValidator, DoctorController.addDoctor);
        this.doctorRouter.get('/id/:id',Validator.idValidator, DoctorController.getDoctorById);
        this.doctorRouter.get('/',Validator.paginationValidator, DoctorController.getDoctors);
        this.doctorRouter.put('/:id',Validator.idValidator, Validator.doctorUpdateValidator, DoctorController.updateDoctorById);
    }
}


const doctorRoutes : express.Router = new DoctorRoutes().doctorRouter;
export { doctorRoutes };

