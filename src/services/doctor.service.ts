import { Connection } from "typeorm";
import { dbConnection } from '../config/db';
import { Doctor, User } from "../core/models";
import { doctor_profile } from '../entity/doctor';

export class DoctorService {

    constructor() {
    }

    /**
     * get user by id
     */
    static async addDoctor(doctor: Doctor | User) {
        return await dbConnection
            .then(async connection2 => {
                let data = await connection2.manager.query(`CALL add_doctor('${doctor.full_name}'::varchar(100) ,'${doctor.gender}' ,'${doctor.email}'::varchar(100) ,'${doctor.password}'::varchar(100) ,'doctor',${doctor.experience},'${doctor.education}','${doctor.licence_no}');`);
                return data;
            })
    }

    /**
     * get user by id
     */
     static async getDoctors(limit:number, offset : number) {
        return await dbConnection
            .then(async connection2 => {
                let data = await connection2.manager.query(`select * from get_doctor(null,${limit},${offset})`);
                return data;
            })
    }

    static async getDoctorById(id: string) {
        return await dbConnection
            .then(async connection2 => {
                let data = await connection2.manager.query(`select * from get_doctor(${id})`);
                return data;
            });
    }

    static async updateDoctorById(doctor: any) {
        return await dbConnection
            .then(async connection2 => {
                let data = await connection2.manager.query(`call update_doctor(${doctor.id},'${doctor.full_name}','${doctor.education}',${doctor.experience},'${doctor.licence_no}','${doctor.gender}')`);
                return data;
            });
    }
}
