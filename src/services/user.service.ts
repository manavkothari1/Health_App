import { Connection } from "typeorm";
import { dbConnection } from '../config/db';
import {user} from '../entity/User';

export class UserService {
    constructor(){
    }

    /**
     * get user by id
     */
    static async getUser(limit : number, offset : number)  {
        return await dbConnection
        .then(async connection2 => {
           let data= await connection2.manager.query(`select * from public.user order by id asc limit ${limit} offset ${offset}`);
           return data;
        })
    }

}
