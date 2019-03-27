import { expect } from 'chai';
import supertest from 'supertest';
import app from '../api/v1/app';

const request = supertest(app);

describe('GET /api/v1', () => {
  it('Should load', (done) => {
    request
      .get('/api/v1/')
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.msg).to.equal('Welcome to banka 1.0');
        done();
      });
  });
});
