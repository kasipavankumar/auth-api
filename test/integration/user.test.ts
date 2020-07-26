import request from 'supertest';
import app from '../../src/app';

describe(`GET /api/users`, () => {
  it(`should return 200 OK.`, (done) => {
    request(app).get(`/api/users`).expect(200, done);
  });
});

describe(`POST /api/users/login`, () => {
  it(`should return 400 BAD REQUEST.`, (done) => {
    request(app).post(`/api/users/login`).expect(400, done);
  });
});

describe(`POST /api/users/register`, () => {
  it(`should return 400 BAD REQUEST.`, (done) => {
    request(app).post(`/api/users/register`).expect(400, done);
  });
});
