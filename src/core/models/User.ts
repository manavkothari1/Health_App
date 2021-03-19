export interface User {
    id?:number | string,
    full_name: string,
    gender:'male'|'female',
    utype:'doctor'|'patient',
    age?:number,
    experience?:number,
    education?:string,
    licence_no?:string,
    physical_handicapped?:boolean,
    password:string,
    email:string
}
