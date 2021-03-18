import { NextFunction, Request, Response } from 'express';
import { Utils } from '../utils/utils';
import { PatientService } from '../services/patient.service';
import { User } from '../core/models';
import { MESSAGES } from '../core/constants/response.message';
import { STATUS } from '../core/constants/status.code';

export class PatientController {
    constructor() { }
     a:any;
     b:unknown;
     st3r:string='';
   
    
    static async get_patient(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        
        // let user_data = await UserService.getUser();
        // return Utils.sendResponse(res,user_data);
    }

    static async add_patient(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        let user_data = await PatientService.add_patient(req);
        return Utils.sendResponse(res,{message: MESSAGES.SUCCESS.USER_ADDED});

    }

}
