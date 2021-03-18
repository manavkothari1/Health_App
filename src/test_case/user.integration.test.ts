import request from 'supertest';

import app from './../app';

describe('checking middleware',()=>{
    beforeEach(() => {
      
    });
    test('1. connected',async ()=>{
        const result = await request(app).get('/');
        expect(result.body).toEqual({message: 'SERVER CONNECTED'});
        expect(result.status).toEqual(200);
    });

    test('1. get all Users',async ()=>{
        const result = await request(app).get('/employee');
        expect(result.status).toEqual(200);
        expect(result.body).toStrictEqual(expect.anything())
    });

});