import {NextFunction,Request,Response} from 'express';
import { Validator } from '../utils/errorHandler';

describe('checking user middleware',()=>{

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

    test('1. Successfully add user',async ()=>{
        mockRequest = {
            body:{
                "full_name":"hello",
                "gender":"male",
                "email":"hello@gmail.com",
                "password":"123123",
                "experience":"11",
                "education":"mbb1s",
                "licence_no":"111"
            }
        }
        mockResponse = {
        }
        await Validator.userValidator(mockRequest as Request,mockResponse as Response,nextFunction)
        expect(nextFunction).toBeCalled();
    });

    test('2. fail to add user',async ()=>{
        mockRequest = {
            body:{
                "full_name":"",
                "gender":"male",
                "email":"",
                "password":"123123",
                "age":"10",
                "physical_handicapped":"false",
                "utype":"patient",
                "experience":"1",
                "education":"mbbs",
                "licence_no":"111"}
        }
        await Validator.userValidator(mockRequest as Request,mockResponse as Response,nextFunction);
        console.log(mockResponse.status);
        expect(mockResponse.status).toBeCalledWith(404);
    });
})