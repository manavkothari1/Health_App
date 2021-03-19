import { Request, Response } from 'express';
import { PatientService } from '../services/patient.service';
import { MESSAGES } from '../core/constants/response.message';
import { STATUS } from '../core/constants/status.code';
import { Utils } from '../utils/utils'
import { Password } from '../utils/auth/Password';
import { Patient } from '../core/models';

export class PatientController {
    constructor() { }

    /**
     * add patient api
     * @param req request 
     * @param res response
     * @returns return error or success
     */
    static async addPatient(req: Request, res: Response): Promise<Response | void> {
        try {
            let patient: Patient = req.body;
            const hashPassword: string = await Password.encrypt(patient.password);

            patient.password = hashPassword;

            await PatientService.addPatient(patient);

            return Utils.sendResponse(res, {
                message: MESSAGES.SUCCESS.USER_ADDED
            })
        } catch (e) {
            console.log(e);
            return Utils.sendError(res, STATUS.INTERNAL_SERVER_ERROR, MESSAGES.ERROR.SOMETHING_WENT_WRONG)
        }
    }

    /**
     * get patients with pagination
     * @param req request
     * @param res response
     * @returns response
     */
    static async getPatients(req: Request, res: Response): Promise<Response | void> {
        try {
            const limit: string = req.query.limit?.toString() || "10";
            const offset: string = req.query.offset?.toString() || "0";

            const patientProfiles: Patient[] = await PatientService.getPatients(parseInt(limit), parseInt(offset));

            return Utils.sendResponse(res, {
                patientProfiles
            })
        } catch (e) {
            console.log(e);
            return Utils.sendError(res, STATUS.INTERNAL_SERVER_ERROR, MESSAGES.ERROR.SOMETHING_WENT_WRONG)
        }
    }

    /**
     * get Patient by id value
     * @param req request
     * @param res response
     * @returns return success or error
     */
    static async getPatientsById(req: Request, res: Response): Promise<Response | void> {
        try {
            const id: string = req.params.id;

            const patient: Patient | null | undefined = await PatientService.getPatientById(id);

            return Utils.sendResponse(res, {
                patient
            })
        } catch (e) {
            console.log(e);
            return Utils.sendError(res, STATUS.INTERNAL_SERVER_ERROR, MESSAGES.ERROR.SOMETHING_WENT_WRONG)
        }
    }

    /**
     * update patient by id
     * @param req request
     * @param res response
     * @returns return success or error
     */
    static async updatePatientById(req: Request, res: Response): Promise<Response | void> {
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

            return Utils.sendResponse(res, {
                patient
            })
        } catch (e) {
            console.log(e);
            return Utils.sendError(res, STATUS.INTERNAL_SERVER_ERROR, MESSAGES.ERROR.SOMETHING_WENT_WRONG)
        }
    }
}
