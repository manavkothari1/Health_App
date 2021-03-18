import { Request } from "express"

export interface IRequest extends Request {
    user: object | string// or any other type
}