import express from 'express';
import { UserController } from '../controllers/user.controller';
import {Validator, ErrorHandler} from '../utils/responseHandler';
import {JwtToken} from '../utils/auth';
import {SuccessHandler} from '../utils/responseHandler';

class UserRoutes {
    public userRouter: express.Router;

    /**
     * routes mapping to the user apis
     */
    constructor() {
        this.userRouter = express.Router();
        this.userRouter.post('/login', Validator.AuthValidator,UserController.login,SuccessHandler.HandleSuccess);
        this.userRouter.use(JwtToken.checkJwt);
        this.userRouter.post('/', Validator.userValidator, UserController.addUser,SuccessHandler.HandleSuccess);
        this.userRouter.get('/', Validator.paginationValidator, UserController.getUser,SuccessHandler.HandleSuccess);
    }
}


const userRoutes : express.Router = new UserRoutes().userRouter;
export { userRoutes };

