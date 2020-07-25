import request from 'supertest';
import app from '../src/app';

describe(`GET /api/users`, () => {
  it(`should return 200`, (done) => {
    request(app).get(`/api/users`).expect(200, done);
  });
});

describe(`GET /api/users/login`, () => {
  it(`should return 200 OK for valid login.`, async () => {
    const response = await request(app)
      .post(`/api/users/login`)
      .send({ email: `auth-baba@email.com`, password: `1234567` });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('msg');
    expect(response.body).toHaveProperty('token');
  });

  it(`should return 401 Unauthorized for invalid login.`, async () => {
    const response = await request(app)
      .post(`/api/users/login`)
      .send({ email: `auth-invalid@email.com`, password: `not found` });

    expect(response.status).toBe(401);
  });
});
