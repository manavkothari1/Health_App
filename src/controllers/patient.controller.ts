import { NextFunction } from 'express';
import { PatientService } from '../services/patient.service';
import { MESSAGES } from '../core/constants/response.message';
import { STATUS } from '../core/constants/status.code';
import { Utils } from '../utils/utils'
import { Password } from '../utils/auth/Password';
import { Patient,IResponse,IRequest } from '../core/models';
import { APIError } from '../utils/responseHandler';

export class PatientController {
    constructor() { }

    /**
     * add patient api
     * @param req request 
     * @param res response
     * @returns return error or success
     */
    static async addPatient(req: IRequest, res: IResponse, next: NextFunction): Promise<IResponse | void> {
        try {
            let patient: Patient = req.body;
            const hashPassword: string = await Password.encrypt(patient.password);

            patient.password = hashPassword;

            await PatientService.addPatient(patient);

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
     * get patients with pagination
     * @param req request
     * @param res response
     * @returns response
     */
    static async getPatients(req: IRequest, res: IResponse, next: NextFunction): Promise<IResponse | void> {
        try {
            const limit: string = <string>req.query.limit;
            const offset: string = <string>req.query.offset;

            const patientProfiles: Patient[] = await PatientService.getPatients(parseInt(limit), parseInt(offset));

            res.success = {
                patientProfiles
            }
            next();
        } catch (e) {
            console.log(e);
            next(new APIError({ message: MESSAGES.ERROR.SOMETHING_WENT_WRONG, status: STATUS.INTERNAL_SERVER_ERROR, isPublic: true }))
        }
    }

    /**
     * get Patient by id value
     * @param req request
     * @param res response
     * @returns return success or error
     */
    static async getPatientsById(req: IRequest, res: IResponse, next: NextFunction): Promise<IResponse | void> {
        try {
            const id: string = req.params.id;

            const patient: Patient | null | undefined = await PatientService.getPatientById(id);

            res.success = {
                patient
            }
            next();
        } catch (e) {
            console.log(e);
           next(new APIError({ message: MESSAGES.ERROR.SOMETHING_WENT_WRONG, status: STATUS.INTERNAL_SERVER_ERROR, isPublic: true }))
        }
    }

    /**
     * update patient by id
     * @param req request
     * @param res response
     * @returns return success or error
     */
    static async updatePatientById(req: IRequest, res: IResponse, next: NextFunction): Promise<IResponse | void> {
        try {
            const id: string = req.params.id;
            const {
                full_name,
                gender,
                age,
                physical_handicapped
            }: {
                full_name: string,
                gender: 'male' | 'female',
                age: number,
                physical_handicapped: boolean
            } = req.body;

            await PatientService.updatePatientById({
                id,
                full_name,
                physical_handicapped,
                gender,
                age
            });

            const patient: Patient | undefined | null = await PatientService.getPatientById(id);

            res.success = {
                patient
            }
            next();
        } catch (e) {
            console.log(e);
           next(new APIError({ message: MESSAGES.ERROR.SOMETHING_WENT_WRONG, status: STATUS.INTERNAL_SERVER_ERROR, isPublic: true }))
        }
    }
}
