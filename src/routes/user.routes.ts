import express from 'express';
import { UserController } from '../controllers/user.controller';

class UserRoutes {
    public userRouter: express.Router;

    /**
     * routes mapping to the user apis
     */
    constructor() {
        this.userRouter = express.Router();
        this.userRouter.post('/', UserController.addUser);
        this.userRouter.get('/', UserController.getUser);
    }
}


const userRoutes : express.Router = new UserRoutes().userRouter;
export { userRoutes };

