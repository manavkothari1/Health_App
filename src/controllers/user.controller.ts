import { Request, Response,NextFunction, } from 'express';
import { DoctorService } from '../services/doctor.service';
import { PatientService } from '../services/patient.service';
import { MESSAGES } from '../core/constants/response.message';
import { STATUS } from '../core/constants/status.code';
import { Utils } from '../utils/utils'
import { UserService } from '../services/user.service';
import { Password, JwtToken } from '../utils/auth';
import {User} from '../core/models';

export class UserController {
    constructor() { }
    /**
     * user login api
     * @param req request 
     * @param res response
     * @returns 
     */
    static async login(req: Request, res: Response): Promise<Response | void> {
        try {
            const { email, password }: { email: string, password: string } = req.body;
            const user: User | undefined | null = await UserService.getUserByEmail(email);
           
            if (!user) {
                return Utils.sendError(res, STATUS.NOT_FOUND, MESSAGES.ERROR.INVALID_CRED)
            }

            const isLogin: boolean = await Password.compare(password, user.password.trim());
           
            if (isLogin) {
                const token : string = await JwtToken.generateJwt(user);

                return Utils.sendResponse(res, {
                    message: MESSAGES.SUCCESS.LOGGED_IN,
                    user,
                    token
                })
            }

            return Utils.sendError(res, STATUS.NOT_FOUND, MESSAGES.ERROR.INVALID_CRED)

        } catch (e) {
            console.log(e);
            return Utils.sendError(res, STATUS.INTERNAL_SERVER_ERROR, MESSAGES.ERROR.SOMETHING_WENT_WRONG)
        }
    }
    
    /**
     * Add User api user can be doctor or patient
     * @param req request
     * @param res response
     * @returns 
     */
    static async addUser(req: Request, res: Response): Promise<Response | void> {
        try {
            let user : User = req.body;

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
            return Utils.sendError(res, STATUS.NOT_FOUND, MESSAGES.ERROR.INVALID_USER_TYPE)
        } catch (e) {
            console.log(e);
            return Utils.sendError(res, STATUS.INTERNAL_SERVER_ERROR, MESSAGES.ERROR.SOMETHING_WENT_WRONG)
        }
    }

    /**
     * get users api with pagination
     * @param req request
     * @param res response
     * @returns 
     */
    static async getUser(req: Request, res: Response): Promise<Response | void> {
        try {
            const limit: string = req.query.limit?.toString() ? req.query.limit?.toString() : "10";
            const offset: string = req.query.offset?.toString() ? req.query.offset?.toString() : "0";

            const users: User[] = await UserService.getUser(parseInt(limit), parseInt(offset));
            return Utils.sendResponse(res, {
                users
            })
        } catch (e) {
            console.log(e);
            return Utils.sendError(res, STATUS.INTERNAL_SERVER_ERROR, MESSAGES.ERROR.SOMETHING_WENT_WRONG)
        }
    }
}
