import request from 'supertest';
import app from '../../src/app';

describe('getPosts router:', () => {
  test('Success:', async () => {
    const result = await request(app).get('/api/post?page=0&limit=5').send();
    expect(result.statusCode).toBe(200);
  });
});

describe('getPost router:', () => {
  test('Success:', async () => {
    const result = await request(app).get('/api/post/60d21b4967d0d8992e610c90').send();
    expect(result.statusCode).toBe(200);
  });
  test('Error:', async () => {
    const result = await request(app).get('/api/post/60d21b4967d0d8992e610c90212').send();
    expect(result.statusCode).toBe(500);
    expect(JSON.parse(result.text)).toEqual({ status: 500, "error": "Internal server error"});
  });
});

describe('getPostsByUser router:', () => {
  test('Success:', async () => {
    const result = await request(app).get('/api/user/60d0fe4f5311236168a109cb/post').send();
    expect(result.statusCode).toBe(200);
  });
  test('Error:', async () => {
    let result = await request(app).get('/api/user/60d0fe4f5311236168a109c234b/post').send();
    expect(result.statusCode).toBe(500);
    expect(JSON.parse(result.text)).toEqual({ status: 500, "error": "Internal server error"});
  });
});
