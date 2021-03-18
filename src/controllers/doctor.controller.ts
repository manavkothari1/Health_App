import { NextFunction, Request, Response } from 'express';
import { Utils } from '../utils/utils';
import { DoctorService } from '../services/doctor.service';
import { MESSAGES } from '../core/constants/response.message';
import { STATUS } from '../core/constants/status.code';

export class DoctorController {
    constructor() { }

    static async addDoctor(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        try {
            const { full_name, gender, email, password, experience, education, licence_no } = req.body;
            await DoctorService.addDoctor({
                email,
                full_name,
                gender,
                experience,
                education,
                licence_no,
                password
            })
            return Utils.sendResponse(res, {
                message: MESSAGES.SUCCESS.USER_ADDED
            })
        } catch (e) {
            console.log(e);
            return Utils.sendError(res, STATUS.INTERNAL_SERVER_ERROR, MESSAGES.ERROR.SOMETHING_WENT_WRONG)
        }
    }

    static async getDoctors(req: Request, res: Response): Promise<Response | void> {
        try{
            const limit :string = req.query.limit?.toString() || "10";
            const offset: string = req.query.offset?.toString() || "0";

            const doctorProfiles = await DoctorService.getDoctors(parseInt(limit),parseInt(offset));
            console.log(doctorProfiles);
            return Utils.sendResponse(res,{
                doctorProfiles
            })
        }catch(e){
            console.log(e);
            return Utils.sendError(res,STATUS.INTERNAL_SERVER_ERROR,MESSAGES.ERROR.SOMETHING_WENT_WRONG)
        }
    }

    static async getDoctorById(req: Request, res: Response): Promise<Response | void> {
        try{
            const id :string = req.params.id;

            const doctor = await DoctorService.getDoctorById(id);

            return Utils.sendResponse(res,{
                doctor
            })
        }catch(e){
            console.log(e);
            return Utils.sendError(res,STATUS.INTERNAL_SERVER_ERROR,MESSAGES.ERROR.SOMETHING_WENT_WRONG)
        }
    }


    static async updateDoctorById(req: Request, res: Response): Promise<Response | void> {
        try{
            const id :string = req.params.id;
            const { full_name, gender, email, password, experience, education, licence_no } = req.body;

            await DoctorService.updateDoctorById({
                full_name, gender, email, password, experience, education, licence_no,id
            });

            const doctor = await DoctorService.getDoctorById(id);

            return Utils.sendResponse(res,{
                doctor
            })
        }catch(e){
            console.log(e);
            return Utils.sendError(res,STATUS.INTERNAL_SERVER_ERROR,MESSAGES.ERROR.SOMETHING_WENT_WRONG)
        }
    }

}
