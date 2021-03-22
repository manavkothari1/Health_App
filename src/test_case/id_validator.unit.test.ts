import {NextFunction,Request,Response} from 'express';
import { Validator } from '../utils/errorHandler';

describe('checking middleware',()=>{

    let mockRequest: Partial<Request>;
    let mockResponse: Partial<any>;
    let nextFunction: NextFunction = jest.fn();
    beforeEach(() => {
        mockRequest = {};
        mockResponse =  {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
    });

    test('1.id available',async ()=>{
        mockRequest = {
            params:{id:"1"}
        }
        mockResponse = {
        }
        await Validator.idValidator(mockRequest as Request,mockResponse as Response,nextFunction)
        expect(nextFunction).toBeCalled();
    });

    test('2. id not available',async ()=>{
        mockRequest = {
            params:{}
        }
        await Validator.idValidator(mockRequest as Request,mockResponse as Response,nextFunction)
        expect(mockResponse.status).toBeCalledWith(404);
    });

})