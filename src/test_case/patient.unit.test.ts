import {NextFunction,Request,Response} from 'express';
import { Validator } from '../utils/validator/Validator';

describe('checking patient middleware',()=>{

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

    test('1. Successfully add doctor',async ()=>{
        mockRequest = {
            body:{
                "full_name":"Pavan",
                "physical_handicapped":false,
                "gender":"male",
                "email":"hello12@gmail.com",
                "password":"123123",
                "age":10
            }
        }
        mockResponse = {
        }
        await Validator.patientValidator(mockRequest as Request,mockResponse as Response,nextFunction)
        expect(nextFunction).toBeCalled();
    });

    test('2. fail to add patient',async ()=>{
        mockRequest = {
            body:{
                "full_name":"PAVAN",
                "physical_handicapped":false,
                "gender":"Others",
                "email":"",
                "password":"123123",
                "age":10
            }
        }
        await Validator.patientValidator(mockRequest as Request,mockResponse as Response,nextFunction)
        expect(mockResponse.status).toBeCalledWith(404);
    });

    test('3. Successfully update patient',async ()=>{
        mockRequest = {
            params:{
                "id":"1",
            },
            body:{
                "full_name":"Pavan Patel",
                "physical_handicapped":false,
                "gender":"male",
                "age":10
            }
        }
        await Validator.patientUpdateValidator(mockRequest as Request,mockResponse as Response,nextFunction)
        expect(nextFunction).toBeCalled();
    });

    test('4. fail to update patient',async ()=>{
        mockRequest = {
            params:{
                "id":"1",
            },
            body:{
                "full_name":"Pavan Patel",
                "physical_handicapped":false,
                "gender":"other",
                "age":10
            }
        }
        await Validator.patientUpdateValidator(mockRequest as Request,mockResponse as Response,nextFunction)
        expect(mockResponse.status).toBeCalledWith(404);
    });
})