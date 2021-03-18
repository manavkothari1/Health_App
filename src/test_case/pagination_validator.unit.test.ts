import {NextFunction,Request,Response} from 'express';
import { Validator } from '../utils/validator/Validator';

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

    test('1. success pagination limit',async ()=>{
        mockRequest = {
            params:{limit:"1",offset:"2"}
        }
        mockResponse = {
        }
        await Validator.paginationValidator(mockRequest as Request,mockResponse as Response,nextFunction)
        expect(nextFunction).toBeCalled();
    });

    test('2. limit not available',async ()=>{
        mockRequest = {
            params:{offset:"2"}
        }
        await Validator.idValidator(mockRequest as Request,mockResponse as Response,nextFunction)
        expect(mockResponse.status).toBeCalledWith(404);
    });

    // test('3. offset not available',async ()=>{
    //     mockRequest = {
    //         params:{limit:"1"}
    //     }
    //     await Validator.idValidator(mockRequest as Request,mockResponse as Response,nextFunction)
    //     expect(mockResponse.status).toBeCalledWith(404);
    // });

    // test('4. limit offset not available',async ()=>{
    //     mockRequest = {
    //         params:{}
    //     }
    //     await Validator.idValidator(mockRequest as Request,mockResponse as Response,nextFunction)
    //     expect(mockResponse.status).toBeCalledWith(404);
    // });

    // test('5. limit offset not available',async ()=>{
    //     mockRequest = {
    //         params:{}
    //     }
    //     await Validator.idValidator(mockRequest as Request,mockResponse as Response,nextFunction)
    //     expect(mockResponse.status).toBeCalledWith(404);
    // });

    // test('6. limit max error',async ()=>{
    //     mockRequest = {
    //         params:{limit:"400",offset:"2"}
    //     }
    //     await Validator.idValidator(mockRequest as Request,mockResponse as Response,nextFunction)
    //     expect(mockResponse.status).toBeCalledWith(404);
    // });

    // test('7. limit min error',async ()=>{
    //     mockRequest = {
    //         params:{limit:"0",offset:"2"}
    //     }
    //     await Validator.idValidator(mockRequest as Request,mockResponse as Response,nextFunction)
    //     expect(mockResponse.status).toBeCalledWith(404);
    // });

    // test('8. offset min error',async ()=>{
    //     mockRequest = {
    //         params:{limit:"10",offset:"-1"}
    //     }
    //     await Validator.idValidator(mockRequest as Request,mockResponse as Response,nextFunction)
    //     expect(mockResponse.status).toBeCalledWith(404);
    // });

})