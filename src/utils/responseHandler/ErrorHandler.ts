import { NextFunction, Request, Response } from 'express';

export class ErrorHandler {
    /**
       * Auth Validator
       * @param req request
       * @param res response
       * @returns return next function or error
       */
    static async HandleError(err:any, req: Request, res: Response,next:NextFunction): Promise<Response | void> {
        return res.status(err.status).send({ error: err.message });
    }

}
