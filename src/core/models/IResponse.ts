import { Response } from "express"

export interface IResponse extends Response {
    success?: object| object[] | string// or any other type
}