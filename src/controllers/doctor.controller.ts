import { NextFunction, Request, Response } from 'express';
import { Utils } from '../utils/utils';
import { DoctorService } from '../services/doctor.service';
import { MESSAGES } from '../core/constants/response.message';
import { STATUS } from '../core/constants/status.code';
import { Password } from '../utils/auth/Password';
import { Doctor } from '../core/models';

export class DoctorController {

    /**
     * add doctor api
     * @param req request
     * @param res response
     * @returns 
     */
    static async addDoctor(req: Request, res: Response): Promise<Response | void> {
        try {
            const doctor: Doctor = req.body;
            const hashPassword = <string>await Password.encrypt(doctor.password);

            doctor.password = hashPassword;

            await DoctorService.addDoctor(doctor);

            return Utils.sendResponse(res, {
                message: MESSAGES.SUCCESS.USER_ADDED
            })
        } catch (e) {
            console.log(e);
            return Utils.sendError(res, STATUS.INTERNAL_SERVER_ERROR, MESSAGES.ERROR.SOMETHING_WENT_WRONG)
        }
    }

    /**
     * get doctors api
     * @param req request
     * @param res response
     * @returns return success or fail
     */
    static async getDoctors(req: Request, res: Response): Promise<Response | void> {
        try {
            const limit: string = req.query.limit?.toString() || "10";
            const offset: string = req.query.offset?.toString() || "0";

            const doctorProfiles : Doctor[]= await DoctorService.getDoctors(parseInt(limit), parseInt(offset));
            return Utils.sendResponse(res, {
                doctorProfiles
            })
        } catch (e) {
            console.log(e);
            return Utils.sendError(res, STATUS.INTERNAL_SERVER_ERROR, MESSAGES.ERROR.SOMETHING_WENT_WRONG)
        }
    }


    /**
     * get doctor by id
     * @param req request
     * @param res response
     * @returns return success or error
     */
    static async getDoctorById(req: Request, res: Response): Promise<Response | void> {
        try {
            const id: string = req.params.id;
            const doctor : Doctor = await DoctorService.getDoctorById(id);
            return Utils.sendResponse(res, {
                doctor
            })
        } catch (e) {
            console.log(e);
            return Utils.sendError(res, STATUS.INTERNAL_SERVER_ERROR, MESSAGES.ERROR.SOMETHING_WENT_WRONG)
        }
    }


    /**
     * update doctor by id
     * @param req request
     * @param res response
     * @returns return success or fail
     */
    static async updateDoctorById(req: Request, res: Response): Promise<Response | void> {
        try {
            const id: string = req.params.id;
            const { full_name, gender, email, password, experience, education, licence_no }: {
                full_name: string,
                gender: 'male' | 'female',
                email: string,
                password: string,
                experience: number,
                education: string,
                licence_no: string
            } = req.body;

            await DoctorService.updateDoctorById({
                full_name, gender, email, password, experience, education, licence_no, id
            });
            const doctor : Doctor = await DoctorService.getDoctorById(id);
            return Utils.sendResponse(res, {
                doctor
            })
        } catch (e) {
            console.log(e);
            return Utils.sendError(res, STATUS.INTERNAL_SERVER_ERROR, MESSAGES.ERROR.SOMETHING_WENT_WRONG)
        }
    }

}
