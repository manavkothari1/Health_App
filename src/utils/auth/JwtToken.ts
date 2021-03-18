import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import { Utils } from '../utils';
import { MESSAGES } from '../../core/constants/response.message';
import { STATUS } from '../../core/constants/status.code';
import { IRequest} from '../../core/models';
class Auth {
static async checkJwt(req: IRequest, res: Response, next: NextFunction){
    const token = <string>req.headers["Authorization"];
    let jwtPayload;
    try {
      jwtPayload =jwt.verify(token, "jwt-secret");
      req.user = jwtPayload;
      next();
    } catch (error) {
      Utils.sendError(res,STATUS.NOT_AUTHORIZATION,MESSAGES.ERROR.AUTHENTICATION_ERROR)
      return;
    }
  }

  static generateJwt(obj:any):string{
  const newToken = jwt.sign(obj, "jwt-secret", {
    expiresIn: "1d"
  });
  return newToken;
}
}

export { Auth };
