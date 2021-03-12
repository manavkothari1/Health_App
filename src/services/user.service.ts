import { Connection } from "typeorm";
import { dbConnection } from '../config/db';
import { User } from '../core/models';

export class UserService {
    
    constructor(){
    }

    /**
     * get user by id
     * @param id id of the user
     */
    static async getUserById(id:number) :Promise<User | null | undefined> {
        return null;
    }

}
