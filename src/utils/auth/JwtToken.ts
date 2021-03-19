import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import { Utils } from '../utils';
import { MESSAGES } from '../../core/constants/response.message';
import { STATUS } from '../../core/constants/status.code';
import { rearg } from "lodash";
// import { IRequest } from '../../core/models';
class JwtToken {
  /**
   * check jwt token verify token
   * @param req request 
   * @param res response
   * @param next next
   * @returns return void
   */
  static async checkJwt(req: Request, res: Response, next: NextFunction):Promise<Response | void> {
    const token  = <string>req.headers["authorization"];

    if(!token){
      return Utils.sendError(res, STATUS.NOT_AUTHORIZATION, MESSAGES.ERROR.AUTHENTICATION_ERROR);
    }

    try {
      let jwtPayload = await jwt.verify(token, "jwt-secret");
      if(!jwtPayload){
        return Utils.sendError(res, STATUS.NOT_AUTHORIZATION, MESSAGES.ERROR.AUTHENTICATION_ERROR);
      }
      next();
    } catch (error) {
      return Utils.sendError(res, STATUS.NOT_AUTHORIZATION, MESSAGES.ERROR.AUTHENTICATION_ERROR);
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
