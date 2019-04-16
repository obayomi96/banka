import { expect } from 'chai';
import supertest from 'supertest';
import app from '../app';

const request = supertest(app);
const apiEndPoint = '/api/v1/';

describe(`GET ${apiEndPoint}`, () => {
  it('Should load', (done) => {
    request
      .get(apiEndPoint)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.msg).to.equal('Welcome to banka 1.0');
        done();
      });
  });
});
