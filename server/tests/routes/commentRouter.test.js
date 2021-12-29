import request from 'supertest';
import app from '../../src/app';

describe('getCommentsByPost router:', () => {
    test('Success:', async () => {
        const result = await request(app).get('/api/post/60d21bf967d0d8992e610e9b/comment').send();
        expect(result.statusCode).toBe(200);
    });
    test('Error:', async () => {
        const result = await request(app).get('/api/post/60d21bf967d0d8992e610e9b2355214/comment').send();
        expect(result.statusCode).toBe(500);
        expect(JSON.parse(result.text)).toEqual({ status: 500, "error": "Internal server error" });
    });
});
