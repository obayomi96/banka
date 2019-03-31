import { expect } from 'chai';
import supertest from 'supertest';
import app from '../api/v1/app';

const request = supertest(app);
const apiEndPoint = '/api/v1/';
const usersEndPoint = `${apiEndPoint}auth/`;

const user = {
  id: 5,
  email: 'oluwaseun@gmail.com',
  firstname: 'Oluwaseun',
  lastname: 'Christopher',
  password: 'userPW',
  type: 'client',
  isAdmin: false
};

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

describe(`POST ${usersEndPoint}/signup`, () => {
  it('Should create a new user', (done) => {
    request
      .post(`${usersEndPoint}/signup`)
      .set('content-type', 'Application/json')
      .send(user)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(201);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('data');
        done();
      });
  });
});

describe(`POST ${usersEndPoint}/signin`, () => {
  it('Should login a valid user', (done) => {
    const login = {
      email: 'emmatexi@gmail.com',
      password: 'user4pw'
    };
    request
      .post(`${usersEndPoint}/signin`)
      .set('content-type', 'Application/json')
      .send(login)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('data');
        expect(res.body.data).to.be.an('object');
        expect(res.body.data).to.have.property('token');
        done();
      });
  });
});
