import { Connection } from "typeorm";
import { dbConnection } from '../config/db';
import {doctor_profile} from '../entity/doctor';

export class DoctorService {
    
    constructor(){
    }

    /**
     * get user by id
     */
    static async getDoctor()  {
        return await dbConnection
        .then(async connection2 => {
           let data= await connection2.manager.find(doctor_profile);
           return data;
        })
        
    }

}
