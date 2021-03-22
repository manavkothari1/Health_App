import { NextFunction, } from 'express';
import { DoctorService } from '../services/doctor.service';
import { PatientService } from '../services/patient.service';
import { MESSAGES } from '../core/constants/response.message';
import { STATUS } from '../core/constants/status.code';
import { Utils } from '../utils/utils'
import { UserService } from '../services/user.service';
import { Password, JwtToken } from '../utils/auth';
import { User, IRequest, IResponse } from '../core/models';
import { APIError } from '../utils/responseHandler';

export class UserController {

    /**
     * user login api
     * @param req IRequest 
     * @param res IResponse
     * @returns 
     */
    static async login(req: IRequest, res: IResponse, next: NextFunction): Promise<IResponse | void> {
        try {
            const { email, password }: { email: string, password: string } = req.body;
            const user: User = <User>await UserService.getUserByEmail(email);

            if (!user) {
                next(new APIError({ message: MESSAGES.ERROR.INVALID_CRED, status: STATUS.NOT_FOUND, isPublic: true }))
            }

            const isLogin: boolean = await Password.compare(password, user.password.trim());

            if (!isLogin) {
                next(new APIError({ message: MESSAGES.ERROR.INVALID_CRED, status: STATUS.NOT_FOUND, isPublic: true }))
            }

            const token: string = await JwtToken.generateJwt(user);

            res.success = {
                message: MESSAGES.SUCCESS.LOGGED_IN,
                user,
                token
            }
            next();
        } catch (e) {
            console.log(e);
            next(new APIError({ message: MESSAGES.ERROR.INVALID_CRED, status: STATUS.NOT_AUTHORIZATION, isPublic: true }))
        }
    }

    /**
     * Add User api user can be doctor or patient
     * @param req IRequest
     * @param res IResponse
     * @returns 
     */
    static async addUser(req: IRequest, res: IResponse, next: NextFunction): Promise<IResponse | void> {
        try {
            let user: User = req.body;

            user.password = <string>await Password.encrypt(user.password);

            if (user.utype === 'doctor') {
                await DoctorService.addDoctor(user)
                res.success = {
                    message: MESSAGES.SUCCESS.USER_ADDED
                }
                next();
            }

            if (user.utype === 'patient') {
                await PatientService.addPatient(user)
                res.success = {
                    message: MESSAGES.SUCCESS.USER_ADDED
                }
                next();
            }

            next(new APIError({ message: MESSAGES.ERROR.INVALID_USER_TYPE, status: STATUS.NOT_FOUND, isPublic: true }))
        } catch (e) {
            console.log(e);
            next(new APIError({ message: MESSAGES.ERROR.SOMETHING_WENT_WRONG, status: STATUS.INTERNAL_SERVER_ERROR, isPublic: true }))
        }
    }

    /**
     * get users api with pagination
     * @param req IRequest
     * @param res IResponse
     * @returns 
     */
    static async getUser(req: IRequest, res: IResponse, next: NextFunction): Promise<IResponse | void> {
        try {
            const limit: string = <string>req.query.limit;
            const offset: string = <string>req.query.offset;

            const users: User[] = await UserService.getUser(parseInt(limit), parseInt(offset));
            res.success = {
                users
            }
            next();
        } catch (e) {
            console.log(e);
            next(new APIError({ message: MESSAGES.ERROR.SOMETHING_WENT_WRONG, status: STATUS.INTERNAL_SERVER_ERROR, isPublic: true }))
        }
    }
}
