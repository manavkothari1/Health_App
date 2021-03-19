import {NextFunction,Request,Response} from 'express';
import { Validator } from '../utils/validator/Validator';

describe('checking doctor middleware',()=>{

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

    test('1. success doctor',async ()=>{
        mockRequest = {
            body:{
                "full_name":"Dr.NEHA",
                "gender":"female",
                "email":"neha@gmail.com",
                "password":"123123",
                "experience":"11",
                "education":"mbb1s",
                "licence_no":"111"
            }
        }
        mockResponse = {
        }
        await Validator.doctorValidator(mockRequest as Request,mockResponse as Response,nextFunction)
        expect(nextFunction).toBeCalled();
    });

    test('1. fail doctor',async ()=>{
        mockRequest = {
            body:{
                "full_name":"Dr.NEHAL",
                "gender":"other",
                "email":"neha@gmail.com",
                "password":"123123",
                "experience":"ABCED",
                "education":"mbb1s",
                "licence_no":"111"
            }
        }
        await Validator.doctorValidator(mockRequest as Request,mockResponse as Response,nextFunction)
        expect(mockResponse.status).toBeCalledWith(404);
    });

})