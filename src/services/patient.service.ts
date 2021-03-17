import { Connection } from "typeorm";
import { dbConnection } from '../config/db';
import { patient_profile } from '../entity/patient';

export class PatientService {
    
    constructor(){
    }

    /**
     * get user by id
     */
    static async addPatient(patient:any)  {
        return await dbConnection
        .then(async connection2 => {
           let data= await connection2.manager.query(`CALL add_patient('${patient.full_name}'::varchar(100) ,${patient.age},false,'${patient.gender}' ,'${patient.email}'::varchar(100) ,'${patient.password}'::varchar(100) ,'patient');`);
           return data;
        })
    }

    static async getPatients(limit : number, offset : number)  {
        return await dbConnection
        .then(async connection2 => {
           let data= await connection2.manager.query(`select * from patient_profile as ptp inner join public.user as usr on (ptp.user_id=usr.id) ORDER BY ptp.id asc limit ${limit} offset ${offset}`);
           return data;
        })
    }

    static async getPatientById(id: string) {
        return await dbConnection
            .then(async connection2 => {
                let data = await connection2.manager.query(`select * from get_patient(${id})`);
                return data;
            });
    }
}
