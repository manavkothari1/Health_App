import { NextFunction, Request, Response } from 'express';
import { Utils } from '../utils/utils';
import { DoctorService } from '../services/doctor.service';
// import { User } from '../core/models';
// import { MESSAGES } from '../core/constants/response.message';
// import { STATUS } from '../core/constants/status.code';

export class DoctorController {
    constructor() { }

    static async getDoctorUser(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        let user_data = await DoctorService.getDoctor();
        return Utils.sendResponse(res,user_data);
    }

}
