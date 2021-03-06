export interface Patient {
    id?:number | string,
    full_name: string,
    gender:'male'|'female',
    age?:number,
    physical_handicapped:boolean,
    password:string,
    email?:string
}