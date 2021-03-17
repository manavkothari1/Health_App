import {createConnection,Connection} from "typeorm";
require('custom-env').env('test'); 
import {user} from '../entity/User';
 
class DB {
    public connection: Promise<Connection>;
 
    /**
    * initalizing db connection
    */ 
    constructor() {
        this.connection = createConnection({
            type: "postgres",
            host: process.env.DB_HOST,
            port: 5432,
            username: process.env.DB_USERNAME,
            password:  process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE,
            entities: [user],
            ssl: {
                rejectUnauthorized: false
            }
        });
    }
}
 
const dbConnection = new DB().connection;
export { dbConnection };
