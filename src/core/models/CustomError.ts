export interface CustomError extends Error {
    message: string,
    stack? : any,
    errors?: any,
    status?:number,
    isPublic:boolean,
  }
