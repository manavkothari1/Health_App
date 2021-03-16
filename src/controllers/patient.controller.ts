import { NextFunction, Request, Response } from 'express';
import { Utils } from '../utils/utils';
import { PatientService } from '../services/patient.service';

export class PatientController {
    constructor() { }

    static async getPatient(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        let user_data = await PatientService.getPatient();
        return Utils.sendResponse(res,user_data);
    }

}
