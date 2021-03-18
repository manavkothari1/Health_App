import {Request} from 'express';

import { dbConnection } from '../config/db';
import {patient_profile} from '../entity/patient';
export class PatientService {
    
    constructor(){
    }

    /**
     * get user by id
     */
    static async getPatientList()  {
        return await dbConnection
        .then(async connection2 => {
           let data= await connection2.manager.find(patient_profile);
           return data;
        })
    }

    static async add_patient(req: Request)  {
        return await dbConnection
        .then(async connection2 => {
            return await connection2
            .query(`CALL add_patient('${req.body.patient_name}','${req.body.age}','${req.body.is_handicapped}','${req.body.gender}','${req.body.email}','${req.body.password}','${req.body.type}')`)
         })
    }

}
