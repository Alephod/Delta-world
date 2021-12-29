import app from '../../src/app.js';
import request from 'supertest';

describe('getUsers router:', () => {
    it('Success:', async () => {
        const result = await request(app).get('/api/user?page=0&limit=5').send();
        expect(result.statusCode).toBe(200);
    });
});

describe('getUser router:', () => {
    test('Success:', async () => {
        const result = await request(app).get('/api/user/60d0fe4f5311236168a109cb').send();
        expect(result.statusCode).toBe(200);
    });
    test('Error:', async () => {
        const result = await request(app).get('/api/user/60d0fe4f5311236168a109cb234').send();
        expect(result.statusCode).toBe(500);
        expect(JSON.parse(result.text)).toEqual({ "status": 500, "error": "Internal server error" });
    });
});

describe('createUser router:', () => {
    test('Success:', async () => {
        const result = await request(app).post('/api/user/create').send({
            firstName: 'Name',
            lastName: 'JestTest',
            email: String(Math.floor(Math.random() * 1000) + 100) + '@yandex.ru'
        });
        expect(result.statusCode).toBe(200);
    });
    test('Error:', async () => {
        const result = await request(app).post('/api/user/create').send();
        expect(result.statusCode).toBe(500);
        expect(JSON.parse(result.text)).toEqual({ "status": 500, "error": "Internal server error" });
    });
});

describe('updateUser router:', () => {
    test('Success:', async () => {
        const result = await request(app).put('/api/user/60d0fe4f5311236168a109cb').send({
            firstName: 'NewName'
        });
        expect(result.statusCode).toBe(200);
    });
    test('Error:', async () => {
        const result = await request(app).put('/api/user/60d0fe4f5311236168a109cb224').send();
        expect(result.statusCode).toBe(500);
        expect(JSON.parse(result.text)).toEqual({"status": 500, "error": "Internal server error"});
    });
});
