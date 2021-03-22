import { Response } from "express"

export interface IResponse extends Response {
    user?: object| object[] | string// or any other type
}