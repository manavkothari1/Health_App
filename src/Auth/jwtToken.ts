import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import { Utils } from '../utils/utils';
import { MESSAGES } from '../core/constants/response.message';
import { STATUS } from '../core/constants/status.code';

class Auth {
static async checkJwt(req: Request, res: Response, next: NextFunction){
    const token = <string>req.headers["Authorization"];
    let jwtPayload;
    try {
      jwtPayload = <any>jwt.verify(token, "jwt-secret");
      next();
    } catch (error) {
      Utils.sendError(res,STATUS.UNAUTHENTICATED,MESSAGES.ERROR.UNAUTHENTICATION)
      return;
    }
  }

  static generateJwt(userId:number,role:string):string{
  const newToken = jwt.sign({ userId, role }, "jwt-secret", {
    expiresIn: "1d"
  });
  return newToken;
}
}

export { Auth };
