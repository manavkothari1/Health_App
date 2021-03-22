import express from 'express';
import { DoctorController } from '../controllers/doctor.controller';
import { Validator } from '../utils/responseHandler';
import { JwtToken } from '../utils/auth';
import { SuccessHandler } from '../utils/responseHandler';
class DoctorRoutes {
    public doctorRouter: express.Router;

    /**
     * routes mapping to the user apis
     */
    constructor() {
        this.doctorRouter = express.Router();
        this.doctorRouter.use(JwtToken.checkJwt);
        this.doctorRouter.post('/', Validator.doctorValidator, DoctorController.addDoctor, SuccessHandler.HandleSuccess);
        this.doctorRouter.get('/id/:id', Validator.idValidator, DoctorController.getDoctorById, SuccessHandler.HandleSuccess);
        this.doctorRouter.get('/', Validator.paginationValidator, DoctorController.getDoctors, SuccessHandler.HandleSuccess);
        this.doctorRouter.put('/:id', Validator.idValidator, Validator.doctorUpdateValidator, DoctorController.updateDoctorById, SuccessHandler.HandleSuccess);
    }
}


const doctorRoutes: express.Router = new DoctorRoutes().doctorRouter;
export { doctorRoutes };

