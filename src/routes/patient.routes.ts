import express from 'express';
import { PatientController } from '../controllers/patient.controller';
import {Validator} from '../utils/validator/Validator';
import {JwtToken} from '../utils/auth';

class PatientRoutes {
    public patientRouter: express.Router;

    /**
     * routes mapping to the user apis
     */
    constructor() {
        this.patientRouter = express.Router();
        this.patientRouter.use(JwtToken.checkJwt);
        this.patientRouter.post('/',Validator.patientValidator, PatientController.addPatient);
        this.patientRouter.get('/',Validator.paginationValidator, PatientController.getPatients);
        this.patientRouter.get('/id/:id',Validator.idValidator, PatientController.getPatientsById);
        this.patientRouter.put('/:id',Validator.idValidator,Validator.patientUpdateValidator, PatientController.updatePatientById);
    }
}


const patientRoutes : express.Router = new PatientRoutes().patientRouter;
export { patientRoutes };

