import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import { Utils } from '../utils';
import { MESSAGES } from '../../core/constants/response.message';
import { STATUS } from '../../core/constants/status.code';
import { rearg } from "lodash";
// import { IRequest } from '../../core/models';
class JwtToken {
  static async checkJwt(req: Request, res: Response, next: NextFunction):Promise<any> {
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
  
  static generateJwt(obj: any): string {
    const newToken = jwt.sign(obj, "jwt-secret", {
      expiresIn: "1d"
    });
    return newToken;
  }
}

export { JwtToken };
