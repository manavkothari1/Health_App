import { NextFunction, Request, Response } from 'express';
import { UserSchema, DoctorSchema, PatientSchema, DoctorUpdateSchema, PatientUpdateSchema, IdSchema, PaginationSchema } from '../schemas';
import { Utils } from '../utils';
import { STATUS } from '../../core/constants/status.code';

export class Validator {
    constructor() {
    }

    static async idValidator(req: Request, res: Response, next: NextFunction) {
        try {
            await IdSchema.validateAsync(req.params);
            next(req.body)
        } catch (err) {
            console.log(err);
            return Utils.sendError(res, STATUS.NOT_FOUND, err.details[0].message)
        }
    }

    static async paginationValidator(req: Request, res: Response, next: NextFunction) {
        try {
            await PaginationSchema.validateAsync(req.query);
            next(req.body)
        } catch (err) {
            console.log(err);
            return Utils.sendError(res, STATUS.NOT_FOUND, err.details[0].message)
        }
    }
    
    static async userValidator(req: Request, res: Response, next: NextFunction) {
        try {
            await UserSchema.validateAsync(req.body);
            next(req.body)
        } catch (err) {
            console.log(err);
            return Utils.sendError(res, STATUS.NOT_FOUND, err.details[0].message)
        }
    }

    static async doctorValidator(req: Request, res: Response, next: NextFunction) {
        try {
            await DoctorSchema.validateAsync(req.body);
            next(req.body)
        } catch (err) {
            console.log(err);
            return Utils.sendError(res, STATUS.NOT_FOUND, err.details[0].message)
        }
    }

    static async doctorUpdateValidator(req: Request, res: Response, next: NextFunction) {
        try {
            await DoctorUpdateSchema.validateAsync(req.body);
            next(req.body)
        } catch (err) {
            console.log(err);
            return Utils.sendError(res, STATUS.NOT_FOUND, err.details[0].message)
        }
    }

    static async patientValidator(req: Request, res: Response, next: NextFunction) {
        try {
            await PatientSchema.validateAsync(req.body);
            next(req.body)
        } catch (err) {
            console.log(err);
            return Utils.sendError(res, STATUS.NOT_FOUND, err.details[0].message)
        }
    }

    static async patientUpdateValidator(req: Request, res: Response, next: NextFunction) {
        try {
            await PatientUpdateSchema.validateAsync(req.body);
            next(req.body)
        } catch (err) {
            console.log(err);
            return Utils.sendError(res, STATUS.NOT_FOUND, err.details[0].message)
        }
    }
}

