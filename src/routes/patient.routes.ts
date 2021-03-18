import express from 'express';
import { PatientController } from '../controllers/patient.controller';
import {Validator} from '../utils/validator/Validator';

class PatientRoutes {
    public patientRouter: express.Router;

    /**
     * routes mapping to the user apis
     */
    constructor() {
        this.patientRouter = express.Router();
        this.patientRouter.post('/',Validator.patientValidator, PatientController.addPatient);
        this.patientRouter.get('/',Validator.paginationValidator, PatientController.getPatients);
        this.patientRouter.get('/:id',Validator.idValidator,Validator.patientUpdateValidator, PatientController.getPatientsById);
        this.patientRouter.put('/:id',Validator.idValidator, PatientController.updatePatientById);
    }
}


const patientRoutes : express.Router = new PatientRoutes().patientRouter;
export { patientRoutes };

