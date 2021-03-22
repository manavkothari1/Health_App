import express from 'express';
import { PatientController } from '../controllers/patient.controller';
import { Validator } from '../utils/responseHandler';
import { JwtToken } from '../utils/auth';
import { SuccessHandler } from '../utils/responseHandler';

class PatientRoutes {
    public patientRouter: express.Router;

    /**
     * routes mapping to the user apis
     */
    constructor() {
        this.patientRouter = express.Router();
        this.patientRouter.use(JwtToken.checkJwt);
        this.patientRouter.post('/', Validator.patientValidator, PatientController.addPatient, SuccessHandler.HandleSuccess);
        this.patientRouter.get('/', Validator.paginationValidator, PatientController.getPatients, SuccessHandler.HandleSuccess);
        this.patientRouter.get('/id/:id', Validator.idValidator, PatientController.getPatientsById, SuccessHandler.HandleSuccess);
        this.patientRouter.put('/:id', Validator.idValidator, Validator.patientUpdateValidator, PatientController.updatePatientById, SuccessHandler.HandleSuccess);
    }
}


const patientRoutes: express.Router = new PatientRoutes().patientRouter;
export { patientRoutes };

