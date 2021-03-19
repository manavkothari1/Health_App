export interface Doctor {
    id?:number,
    full_name: string,
    gender:'male'|'female',
    experience?:number,
    education?:string,
    licence_no?:string,
    password:string,
    email:string
}
