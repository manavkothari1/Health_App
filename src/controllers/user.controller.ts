import { NextFunction, Request, Response } from 'express';
import { Utils } from '../utils/utils';
import { UserService } from '../services/user.service';
import { User } from '../core/models';
import { MESSAGES } from '../core/constants/response.message';
import { STATUS } from '../core/constants/status.code';

export class UserController {
    constructor() { }

    static async addUser(req: Request, res: Response): Promise<Response | void> {
        try{
            const { full_name,gender,password,utype,experience,education,licence_no} = req.body;
            

        }catch(e){
            console.log(e);
        }
    }
}
