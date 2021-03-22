import { NextFunction } from 'express';
import { Utils } from '../utils/utils';
import { DoctorService } from '../services/doctor.service';
import { MESSAGES } from '../core/constants/response.message';
import { STATUS } from '../core/constants/status.code';
import { Password } from '../utils/auth/Password';
import { Doctor, IRequest, IResponse } from '../core/models';
import { APIError } from '../utils/responseHandler';

export class DoctorController {

    /**
     * add doctor api
     * @param req request
     * @param res response
     * @returns 
     */
    static async addDoctor(req: IRequest, res: IResponse, next: NextFunction): Promise<IResponse | void> {
        try {
            const doctor: Doctor = req.body;
            const hashPassword = <string>await Password.encrypt(doctor.password);

            doctor.password = hashPassword;

            await DoctorService.addDoctor(doctor);

            res.success = {
                message: MESSAGES.SUCCESS.USER_ADDED
            }
            next();
        } catch (e) {
            console.log(e);
            next(new APIError({ message: MESSAGES.ERROR.SOMETHING_WENT_WRONG, status: STATUS.INTERNAL_SERVER_ERROR, isPublic: true }))
        }
    }

    /**
     * get doctors api
     * @param req request
     * @param res response
     * @returns return success or fail
     */
    static async getDoctors(req: IRequest, res: IResponse, next: NextFunction): Promise<IResponse | void> {
        try {
            const limit: string = <string>req.query.limit;
            const offset: string = <string>req.query.offset;

            const doctorProfiles: Doctor[] = await DoctorService.getDoctors(parseInt(limit), parseInt(offset));
           
            res.success =  {
                doctorProfiles
            }
            next();
        } catch (e) {
            console.log(e);
            next(new APIError({ message: MESSAGES.ERROR.SOMETHING_WENT_WRONG, status: STATUS.INTERNAL_SERVER_ERROR, isPublic: true }))
        }
    }


    /**
     * get doctor by id
     * @param req request
     * @param res response
     * @returns return success or error
     */
    static async getDoctorById(req: IRequest, res: IResponse, next: NextFunction): Promise<IResponse | void> {
        try {
            const id: string = req.params.id;
            const doctor: Doctor = await DoctorService.getDoctorById(id);
            
            res.success =  {
                doctor
            }
            next();
        } catch (e) {
            console.log(e);
            // return Utils.sendError(res, STATUS.INTERNAL_SERVER_ERROR, MESSAGES.ERROR.SOMETHING_WENT_WRONG)
            next(new APIError({ message: MESSAGES.ERROR.SOMETHING_WENT_WRONG, status: STATUS.INTERNAL_SERVER_ERROR, isPublic: true }))
        }
    }


    /**
     * update doctor by id
     * @param req request
     * @param res response
     * @returns return success or fail
     */
    static async updateDoctorById(req: IRequest, res: IResponse, next: NextFunction): Promise<IResponse | void> {
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
            const doctor: Doctor = await DoctorService.getDoctorById(id);
            res.success =  {
                doctor
            }
            next();
        } catch (e) {
            console.log(e);
            next(new APIError({ message: MESSAGES.ERROR.SOMETHING_WENT_WRONG, status: STATUS.INTERNAL_SERVER_ERROR, isPublic: true }))
        }
    }

}
