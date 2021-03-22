import { Request, Response, NextFunction, } from 'express';
import { DoctorService } from '../services/doctor.service';
import { PatientService } from '../services/patient.service';
import { MESSAGES } from '../core/constants/response.message';
import { STATUS } from '../core/constants/status.code';
import { Utils } from '../utils/utils'
import { UserService } from '../services/user.service';
import { Password, JwtToken } from '../utils/auth';
import { User } from '../core/models';
import { APIError } from '../utils/errorHandler';

export class UserController {
    constructor() { }
    /**
     * user login api
     * @param req request 
     * @param res response
     * @returns 
     */
    static async login(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
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

            return Utils.sendResponse(res, {
                message: MESSAGES.SUCCESS.LOGGED_IN,
                user,
                token
            })
        } catch (e) {
            console.log(e);
            next(new APIError({ message: MESSAGES.ERROR.INVALID_CRED, status: STATUS.NOT_AUTHORIZATION, isPublic: true }))
        }
    }

    /**
     * Add User api user can be doctor or patient
     * @param req request
     * @param res response
     * @returns 
     */
    static async addUser(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        try {
            let user: User = req.body;

            user.password = <string>await Password.encrypt(user.password);

            if (user.utype === 'doctor') {
                await DoctorService.addDoctor(user)
                return Utils.sendResponse(res, {
                    message: MESSAGES.SUCCESS.USER_ADDED
                })
            }

            if (user.utype === 'patient') {
                await PatientService.addPatient(user)
                return Utils.sendResponse(res, {
                    message: MESSAGES.SUCCESS.USER_ADDED
                })
            }

            next(new APIError({ message: MESSAGES.ERROR.INVALID_USER_TYPE, status: STATUS.NOT_FOUND, isPublic: true }))
        } catch (e) {
            console.log(e);
            next(new APIError({ message: MESSAGES.ERROR.SOMETHING_WENT_WRONG, status: STATUS.INTERNAL_SERVER_ERROR, isPublic: true }))
        }
    }

    /**
     * get users api with pagination
     * @param req request
     * @param res response
     * @returns 
     */
    static async getUser(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        try {
            const limit: string = <string>req.query.limit;
            const offset: string = <string>req.query.offset;

            const users: User[] = await UserService.getUser(parseInt(limit), parseInt(offset));
            return Utils.sendResponse(res, {
                users
            })
        } catch (e) {
            console.log(e);
            next(new APIError({ message: MESSAGES.ERROR.SOMETHING_WENT_WRONG, status: STATUS.INTERNAL_SERVER_ERROR, isPublic: true }))
        }
    }
}
