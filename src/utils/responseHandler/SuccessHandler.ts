import {IResponse,IRequest} from '../../core/models';
import {STATUS} from '../../core/constants/status.code';

export class SuccessHandler {
    /**
       * Auth Validator
       * @param req request
       * @param res response
       * @returns return next function or error
       */
    static async HandleSuccess(req: IRequest, res: IResponse): Promise<IResponse | void> {
        return res.status(STATUS.SUCCESS).json(res.success);
    }
}
