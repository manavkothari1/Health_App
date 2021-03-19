import { dbConnection } from '../config/db';
import { Patient, User } from '../core/models';

export class PatientService {

    /**
     * add patient
     * @param patient add patient payload 
     * @returns return patient
     */
    static async addPatient(patient: Patient | User): Promise<Patient | void> {
        return await dbConnection
            .then(async connection2 => {
                let data = await connection2.manager.query(`CALL add_patient('${patient.full_name}'::varchar(100) ,${patient.age},${patient.physical_handicapped},'${patient.gender}' ,'${patient.email}'::varchar(100) ,'${patient.password}'::varchar(100) ,'patient');`);
                return data;
            })
    }

    /**
     * get patients by id
     * @param limit limit patient number
     * @param offset skip number of records
     * @returns 
     */
    static async getPatients(limit: number, offset: number): Promise<Patient[] | []> {
        return await dbConnection
            .then(async connection2 => {
                let data = await connection2.manager.query(`select * from patient_profile as ptp inner join public.user as usr on (ptp.user_id=usr.id) ORDER BY ptp.id asc limit ${limit} offset ${offset}`);
                return data;
            })
    }

    /**
     * get patient by id
     * @param id id of patient
     * @returns return patient or null
     */
    static async getPatientById(id: string): Promise<Patient | null | undefined> {
        return await dbConnection
            .then(async connection2 => {
                let data = await connection2.manager.query(`select * from get_patient(${id})`);
                return data;
            });
    }

    /**
     * update patient by id
     * @param patient patient object
     * @returns return null
     */
    static async updatePatientById(patient: {
        id:string,
        full_name: string,
        gender: 'male' | 'female',
        age: number,
        physical_handicapped: boolean
    }): Promise<Patient | void | null> {
        console.log(`call update_patient(${patient.id},'${patient.full_name}',${patient.age},${patient.physical_handicapped},'${patient.gender}')`);
        return await dbConnection
            .then(async connection2 => {
                let data = await connection2.manager.query(`call update_patient(${patient.id},'${patient.full_name}',${patient.age},${patient.physical_handicapped},'${patient.gender}')`);
                return data;
            });
    }
}
