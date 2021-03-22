import { NextFunction, Request, Response } from 'express';
import { AuthSchema, UserSchema, DoctorSchema, PatientSchema, DoctorUpdateSchema, PatientUpdateSchema, IdSchema, PaginationSchema } from '../schemas';
import { Utils } from '../utils';
import { STATUS } from '../../core/constants/status.code';
import {APIError } from './APIError';

export class Validator {

    /**
     * Auth Validator
     * @param req request
     * @param res response
     * @param next next function
     * @returns return next function or error
     */
    static async AuthValidator(req: Request, res: Response, next: NextFunction):Promise<Response | void> {
        try {
            await AuthSchema.validateAsync(req.body);
            next();
        } catch (err) {
            console.log(err);
            // next(new APIError({message:err.details[0].message,status: STATUS.NOT_FOUND,isPublic:true}))
            next(new APIError({message:err.details[0].message,status: STATUS.NOT_FOUND,isPublic:true}))
        }
    }
    /**
     * Validate id for params
     * @param req request
     * @param res response
     * @param next next
     * @returns return success or error
     */
    static async idValidator(req: Request, res: Response, next: NextFunction):Promise<Response | void> {
        try {
            console.log(req.params);
            await IdSchema.validateAsync(req.params);
            next()
        } catch (err) {
            // console.log(err);
            next(new APIError({message:err.details[0].message,status: STATUS.NOT_FOUND,isPublic:true}))
        }
    }

    /**
     * pagination validator
     * @param req request
     * @param res response
     * @param next next function
     * @returns return next or error
     */
    static async paginationValidator(req: Request, res: Response, next: NextFunction):Promise<Response | void> {
        try {
            await PaginationSchema.validateAsync(req.query);
            next()
        } catch (err) {
            console.log(err);
            next(new APIError({message:err.details[0].message,status: STATUS.NOT_FOUND,isPublic:true}))
        }
    }
    
    /**
     * user payload validator
     * @param req request
     * @param res response
     * @param next next function
     * @returns 
     */
    static async userValidator(req: Request, res: Response, next: NextFunction):Promise<Response | void> {
        try {
            await UserSchema.validateAsync(req.body);
            next()
        } catch (err) {
            console.log(err);
            next(new APIError({message:err.details[0].message,status: STATUS.NOT_FOUND,isPublic:true}))
        }
    }

    /**
     * doctor validator for doctor payload
     * @param req request
     * @param res response
     * @param next next function
     * @returns return success or error
     */
    static async doctorValidator(req: Request, res: Response, next: NextFunction):Promise<Response | void> {
        try {
            await DoctorSchema.validateAsync(req.body);
            next()
        } catch (err) {
            console.log(err);
            next(new APIError({message:err.details[0].message,status: STATUS.NOT_FOUND,isPublic:true}))
        }
    }

    /**
     * doctor update payload validator
     * @param req request
     * @param res response
     * @param next next function
     * @returns return success or failure
     */
    static async doctorUpdateValidator(req: Request, res: Response, next: NextFunction) :Promise<Response | void>{
        try {
            await DoctorUpdateSchema.validateAsync(req.body);
            next()
        } catch (err) {
            console.log(err);
            next(new APIError({message:err.details[0].message,status: STATUS.NOT_FOUND,isPublic:true}))
        }
    }

    /**
     * patient validator
     * @param req request
     * @param res response
     * @param next next function
     * @returns return success or failure
     */
    static async patientValidator(req: Request, res: Response, next: NextFunction):Promise<Response | void> {
        try {
            await PatientSchema.validateAsync(req.body);
            next()
        } catch (err) {
            console.log(err);
            next(new APIError({message:err.details[0].message,status: STATUS.NOT_FOUND,isPublic:true}))
        }
    }

    /**
     * patient update validator
     * @param req request
     * @param res response
     * @param next next function
     * @returns 
     */
    static async patientUpdateValidator(req: Request, res: Response, next: NextFunction):Promise<Response | void> {
        try {
            await PatientUpdateSchema.validateAsync(req.body);
            next()
        } catch (err) {
            console.log(err);
            next(new APIError({message:err.details[0].message,status: STATUS.NOT_FOUND,isPublic:true}))
        }
    }
}

