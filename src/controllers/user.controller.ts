import { NextFunction, Request, Response } from 'express';
import { DoctorService } from '../services/doctor.service';
import { PatientService } from '../services/patient.service';
import { MESSAGES } from '../core/constants/response.message';
import { STATUS } from '../core/constants/status.code';
import  {Utils} from '../utils/utils'
import { UserService } from '../services/user.service';

export class UserController {
    constructor() { }

    static async addUser(req: Request, res: Response): Promise<Response | void> {
        try{
            const { full_name,gender,email,physical_handicapped,password,age,utype,experience,education,licence_no} = req.body;
            
            if(utype ==  'doctor'){
                await DoctorService.addDoctor({
                    email,
                    full_name,
                    gender,
                    experience,
                    education,licence_no,
                    password
                })
                return Utils.sendResponse(res,{
                    message:MESSAGES.SUCCESS.USER_ADDED
                })
            }

            if(utype == 'patient'){
                await PatientService.addPatient({
                    email,
                    full_name,
                    gender,
                    physical_handicapped,
                    age,
                    password
                }) 
                return Utils.sendResponse(res,{
                    message:MESSAGES.SUCCESS.USER_ADDED
                })
            }

            return Utils.sendError(res,STATUS.NOT_FOUND,MESSAGES.ERROR.INVALID_USER_TYPE)
        }catch(e){
            console.log(e);
            return Utils.sendError(res,STATUS.INTERNAL_SERVER_ERROR,MESSAGES.ERROR.SOMETHING_WENT_WRONG)
        }
    }

    static async getUser(req: Request, res: Response): Promise<Response | void> {
        try{
            const limit :string = req.query.limit?.toString() || "10";
            const offset: string = req.query.offset?.toString() || "0";

            const users = await UserService.getUser(parseInt(limit),parseInt(offset));
            return Utils.sendResponse(res,{
                users
            })
        }catch(e){
            console.log(e);
            return Utils.sendError(res,STATUS.INTERNAL_SERVER_ERROR,MESSAGES.ERROR.SOMETHING_WENT_WRONG)
        }
    }
}
