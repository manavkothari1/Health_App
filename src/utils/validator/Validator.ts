import { NextFunction,Request, Response } from 'express';
import {UserSchema} from '../schemas/UserSchema';
import { Utils } from '../utils';
import { MESSAGES } from '../../core/constants/response.message';
import { STATUS } from '../../core/constants/status.code';

export class Validator {
    constructor() {
    }

   
    static async userValidator(req: Request, res: Response, next: NextFunction ) {
        try{
            await UserSchema.validateAsync(req.body);
            console.log('success');
            next()
        }catch(err){
            console.log(err);
            return Utils.sendError(res,STATUS.NOT_FOUND,err.details[0].message)
        }
    }
}

