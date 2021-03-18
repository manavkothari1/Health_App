import { Response } from 'express';
import { User } from '../core/models';

export class Utils {
    constructor() {
    }

    /**
     * sending response method
     * @param res response
     * @param responseObj  response object which need to be sent
     */
    static sendResponse(res: Response, responseObj: any): Response {
        return res.status(200).json(responseObj);
    }

    /**
     * method to send error message with particular status and message
     * @param res response
     * @param statusCode status code of response
     * @param message message to return as error message
     */
    static sendError(res: Response, statusCode: number, message: string): Response {
        return res.status(statusCode).json({
            message: message
        });
    }
}

