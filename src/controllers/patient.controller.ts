import { NextFunction, Request, Response } from 'express';
import { PatientService } from '../services/patient.service';
import { MESSAGES } from '../core/constants/response.message';
import { STATUS } from '../core/constants/status.code';
import  {Utils} from '../utils/utils'

export class PatientController {
    constructor() { }

    static async addPatient(req: Request, res: Response): Promise<Response | void> {
        try{
            const { full_name,gender,email,password,age} = req.body;
                await PatientService.addPatient({
                    email,
                    full_name,
                    gender,
                    age,
                    password
                }) 
                return Utils.sendResponse(res,{
                    message:MESSAGES.SUCCESS.USER_ADDED
                })
        }catch(e){
            console.log(e);
            return Utils.sendError(res,STATUS.INTERNAL_SERVER_ERROR,MESSAGES.ERROR.SOMETHING_WENT_WRONG)
        }
    }

    static async getPatients(req: Request, res: Response): Promise<Response | void> {
        try{
            const limit :string = req.query.limit?.toString() || "10";
            const offset: string = req.query.offset?.toString() || "0";

            const patientProfiles = await PatientService.getPatients(parseInt(limit),parseInt(offset));
            return Utils.sendResponse(res,{
                patientProfiles
            })
        }catch(e){
            console.log(e);
            return Utils.sendError(res,STATUS.INTERNAL_SERVER_ERROR,MESSAGES.ERROR.SOMETHING_WENT_WRONG)
        }
    }

    static async getPatientsById(req: Request, res: Response): Promise<Response | void> {
        try{
            const id :string = req.params.id;

            const patient = await PatientService.getPatientById(id);

            return Utils.sendResponse(res,{
                patient
            })
        }catch(e){
            console.log(e);
            return Utils.sendError(res,STATUS.INTERNAL_SERVER_ERROR,MESSAGES.ERROR.SOMETHING_WENT_WRONG)
        }
    }
}
