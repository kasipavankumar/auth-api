import request from 'supertest';
import app from '../../src/app';

describe(`GET /dashboard`, () => {
  it(`should return 401 UNAUTHORIZED.`, (done) => {
    request(app).get(`/dashboard`).expect(401, done);
  });
});
