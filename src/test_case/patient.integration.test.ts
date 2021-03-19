import request from 'supertest';

import app from './../app';

let patient={
    "full_name":"new data",
    "physical_handicapped":false,
    "gender":"male",
    "email":"hello12@gmail.com",
    "password":"123123",
    "age":10
};
describe('checking middleware',()=>{
    beforeEach(() => {
      
    });

    test('1. get all patient',async ()=>{
        const result = await request(app.app).get('/patient/?limit=10&offset=0');
        expect(result.status).toEqual(200);
        expect(result.body).toStrictEqual(expect.anything())
    });

    test('2. add patient',async ()=>{
        const result = await request(app.app).post('/patient/').send(patient);
        expect(result.status).toEqual(200);
        expect(result.body).toStrictEqual(expect.anything())
    });
    afterEach(async () => {
        await app.server.close();;        
    });
});