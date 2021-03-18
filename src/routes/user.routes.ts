import express from 'express';
import { UserController } from '../controllers/user.controller';
import {Validator} from '../utils/validator/Validator';

class UserRoutes {
    public userRouter: express.Router;

    /**
     * routes mapping to the user apis
     */
    constructor() {

        this.userRouter = express.Router();
        this.userRouter.post('/', Validator.userValidator,UserController.addUser);
        this.userRouter.get('/',Validator.paginationValidator, UserController.getUser);
    }
}


const userRoutes : express.Router = new UserRoutes().userRouter;
export { userRoutes };

