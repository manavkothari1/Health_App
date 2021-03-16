import express from 'express';
import { PatientController } from '../controllers/patient.controller';

class PatientRoutes {
    public patientRouter: express.Router;

    /**
     * routes mapping to the user apis
     */
    constructor() {
        this.patientRouter = express.Router();
        this.patientRouter.get('/', PatientController.getPatient);
    }
}


const patientRoutes : express.Router = new PatientRoutes().patientRouter;
export { patientRoutes };

