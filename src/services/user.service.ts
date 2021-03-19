import { dbConnection } from '../config/db';
import { User } from "../core/models";

export class UserService {
    constructor(){
    }

    /**
     * get users 
     * @param limit limit of users 
     * @param offset number of skip record
     * @returns return user array
     */
    static async getUser(limit : number, offset : number):Promise<User[]>  {
        return await dbConnection
        .then(async connection2 => {
           let data= await connection2.manager.query(`select * from public.user order by id asc limit ${limit} offset ${offset}`);
           return data;
        })
    }

    /**
     * get user by email
     * @param email email id of user
     * @returns return user object
     */
   static async getUserByEmail(email:string) : Promise<User | null | undefined >  {
       return await dbConnection
       .then(async connection2 => {
          let data= await connection2.manager.query(`select id,email,password from public.user where email='${email}'`);
          return data && data[0];
       })
   }
}
