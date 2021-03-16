import { NextFunction, Request, Response } from 'express';
import { Utils } from '../utils/utils';
import { UserService } from '../services/user.service';
import { User } from '../core/models';
import { MESSAGES } from '../core/constants/response.message';
import { STATUS } from '../core/constants/status.code';

export class UserController {
    constructor() { }

    static async getUser(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        let user_data = await UserService.getUser();
        return Utils.sendResponse(res,user_data);
    }


}
