import { Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import { Utils } from '../utils';
import { MESSAGES } from '../../core/constants/response.message';
import { STATUS } from '../../core/constants/status.code';
// import { IRequest } from '../../core/models';
import { IRequest, IResponse } from '../../core/models';
import { APIError } from '../errorHandler';
class JwtToken {

  /**
   * check jwt token verify token
   * @param req request 
   * @param res response
   * @param next next
   * @returns return void
   */
  static async checkJwt(req: IRequest, res: IResponse, next: NextFunction):Promise<Response | void> {
    const token  = <string>req.headers["authorization"];

    if(!token){
      next(new APIError({ message: MESSAGES.ERROR.AUTHENTICATION_ERROR, status: STATUS.NOT_AUTHORIZATION, isPublic: true }))
    }

    try {
      let jwtPayload = await jwt.verify(token, "jwt-secret");
      if(!jwtPayload){
        next(new APIError({ message: MESSAGES.ERROR.AUTHENTICATION_ERROR, status: STATUS.NOT_AUTHORIZATION, isPublic: true }))
      }
      req.user = jwtPayload;
      next();
    } catch (error) {
      next(new APIError({ message: MESSAGES.ERROR.AUTHENTICATION_ERROR, status: STATUS.NOT_AUTHORIZATION, isPublic: true }))
    }
  }
  
  /**
   * generate token from object
   * @param obj user object
   * @returns return token
   */
  static async generateJwt(obj: Object): Promise<string> {
    const newToken = jwt.sign(obj, "jwt-secret", {
      expiresIn: "1d"
    });
    return newToken;
  }
}

export { JwtToken };
