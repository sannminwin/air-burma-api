import request from 'supertest';
import { app } from '.';

let server: any;

beforeAll((done) => {
  server = app.listen(4000, () => {
    done();
  });
});

afterAll((done) => {
  server.close(done);
});

describe('GET /v1', () => {
  it('should return Hello World', async () => {
    const response = await request(app).get('/v1');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      status: 'success',
      statusCode: 200,
      message: 'Hello World',
    });
  });
});

describe('GET /v1/users', () => {
  it('should return users', async () => {
    const response = await request(app).get('/v1/users');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('status', 'success');
    expect(response.body).toHaveProperty('statusCode', 200);
    expect(response.body).toHaveProperty('data');
  });
});