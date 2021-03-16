import { Connection } from "typeorm";
import { dbConnection } from '../config/db';
import { patient_profile } from '../entity/patient';

export class PatientService {
    
    constructor(){
    }

    /**
     * get user by id
     */
    static async getPatient()  {
        return await dbConnection
        .then(async connection2 => {
           let data= await connection2.manager.find(patient_profile);
           return data;
        })
        
    }

}
