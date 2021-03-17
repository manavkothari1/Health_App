import { Connection } from "typeorm";
import { dbConnection } from '../config/db';
import {user} from '../entity/User';

export class UserService {
    constructor(){
    }

    /**
     * get user by id
     */
    static async getUser()  {
        return await dbConnection
        .then(async connection2 => {
           let data= await connection2.manager.find(user);
           return data;
        })
    }

    /**
     * add user by id
     */
     static async addUser()  {
        return await dbConnection
        .then(async connection2 => {
           let data= await connection2.manager.find(user);
           return data;
        })
    }

}
