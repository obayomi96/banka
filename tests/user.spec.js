import { expect } from 'chai';
import supertest from 'supertest';
import app from '../api/v1/app';

const request = supertest(app);
const apiEndPoint = '/api/v1/';
const usersEndPoint = `${apiEndPoint}auth/`;
const accountEndPoint = `${apiEndPoint}accounts/`;
const transactionEndPoint = `${apiEndPoint}transactions/`;

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

describe('Users auth Tests', () => {
  describe(`POST ${usersEndPoint}signup`, () => {
    it('Should create a new user', (done) => {
      const user = {
        id: 5,
        email: 'oluwaseun@gmail.com',
        firstname: 'Oluwaseun',
        lastname: 'Christopher',
        password: 'userPW',
        type: 'client',
        isAdmin: false
      };
      request
        .post(`${usersEndPoint}signup`)
        .set('content-type', 'application/json')
        .send(user)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(201);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('data');
          done();
        });
    });
    it('Should return 401 if firstname is empty', (done) => {
      const user = {
        lastname: 'Christopher',
        email: 'oluwaseun@mail.com',
        password: 'userPW'
      };
      request
        .post(`${usersEndPoint}signup`)
        .send(user)
        .end((err, res) => {
          expect(res.status).to.equal(401);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('error');
          done();
        });
    });
    it('Should return 401 if lastname is empty', (done) => {
      const user = {
        firstname: 'Oluwaseun',
        email: 'oluwaseun@mail.com',
        password: 'userPW'
      };
      request
        .post(`${usersEndPoint}signup`)
        .send(user)
        .end((err, res) => {
          expect(res.status).to.equal(401);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('error');
          done();
        });
    });
    it('Should return 401 if email is empty', (done) => {
      const user = {
        firstname: 'Oluwaseun',
        lastname: 'Christopher',
        password: 'userPW'
      };
      request
        .post(`${usersEndPoint}signup`)
        .send(user)
        .end((err, res) => {
          expect(res.status).to.equal(401);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('error');
          done();
        });
    });
    it('Should return 401 if password is empty', (done) => {
      const user = {
        firstname: 'Oluwaseun',
        lastname: 'Christopher',
        email: 'oluwaseun@mail.com'
      };
      request
        .post(`${usersEndPoint}signup`)
        .send(user)
        .end((err, res) => {
          expect(res.status).to.equal(401);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('error');
          done();
        });
    });
  });

  describe(`POST ${usersEndPoint}signin`, () => {
    it('Should login a valid user', (done) => {
      const login = {
        email: 'emmatexi@gmail.com',
        password: 'user4pw'
      };
      request
        .post(`${usersEndPoint}signin`)
        .set('content-type', 'application/json')
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
});

describe('Accounts Tests', () => {
  describe(`POST ${accountEndPoint}createAccount`, () => {
    it('Should create a bank account', (done) => {
      const login = {
        email: 'franca@gmail.com',
        password: 'user3pw'
      };
      request
        .post(`${usersEndPoint}signin`)
        .send(login)
        .end((usrLoginErr, usrLoginRes) => {
          const token = `Bearer ${usrLoginRes.body.data.token}`;
          const usrInput = {
            type: 'current',
            initialDeposit: 50.50
          };
          request
            .post(`${accountEndPoint}createAccount`)
            .set('Authorization', token)
            .send(usrInput)
            .end((err, res) => {
              if (err) return done(err);
              expect(res.status).to.equal(201);
              expect(res.body).to.be.an('object');
              expect(res.body).to.have.property('data');
              expect(res.body.data).to.have.an('object');
              done();
            });
        });
    });
  });
  describe(`PATCH ${accountEndPoint}:accountNumber`, () => {
    it('Should change an account status', (done) => {
      const login = {
        email: 'martinsoluwaseun47@gmail.com',
        password: 'user1pw'
      };
      request
        .post(`${usersEndPoint}signin`)
        .send(login)
        .end((usrLoginErr, usrLoginRes) => {
          const token = `Bearer ${usrLoginRes.body.data.token}`;
          request
            .patch(`${accountEndPoint}3839943693`)
            .set('Authorization', token)
            .send({ status: 'Active' })
            .end((err, res) => {
              expect(res.status).to.equal(200);
              expect(res.body).to.be.an('object');
              expect(res.body).to.have.property('data');
              expect(res.body.data).to.have.an('object');
              expect(res.body.data).to.have.property('status');
              done();
            });
        });
    });
  });
  describe(`DELETE ${accountEndPoint}:accountNumber`, () => {
    it('Should delete an account successfully', (done) => {
      const login = {
        email: 'martinsoluwaseun47@gmail.com',
        password: 'user1pw'
      };
      request
        .post(`${usersEndPoint}signin`)
        .send(login)
        .end((usrLoginErr, usrLoginRes) => {
          const token = `Bearer ${usrLoginRes.body.data.token}`;
          request
            .delete(`${accountEndPoint}2239002933`)
            .set('content-type', 'application/json')
            .set('Authorization', token)
            .send({ accountNumber: 2239002933 })
            .end((err, res) => {
              expect(res.status).to.equal(200);
              expect(res.body).to.have.property('msg');
              done();
            });
        });
    });
  });
  describe(`POST ${transactionEndPoint}:accountNumber/credit`, () => {
    it('SHould credit an account successfully', (done) => {
      const login = {
        email: 'anthony.a@gmail.com',
        password: 'user2pw'
      };
      request
        .post(`${usersEndPoint}signin`)
        .send(login)
        .end((usrLoginErr, usrLoginRes) => {
          const token = `Bearer ${usrLoginRes.body.data.token}`;
          request
            .post(`${transactionEndPoint}3839943693/credit`)
            .set('content-type', 'application/json')
            .set('Authorization', token)
            .send({ amount: 1000.45 })
            .end((err, res) => {
              expect(res.status).to.equal(201);
              expect(res.body).to.have.property('data');
              expect(res.body.data).to.be.an('object');
              expect(res.body.data).to.have.property('transactionId');
              expect(res.body.data).to.have.property('cashier');
              expect(res.body.data).to.have.property('transactionType');
              expect(res.body.data).to.have.property('accountBalance');
              done();
            });
        });
    });
  });
  describe(`POST ${transactionEndPoint}:accountNumber/debit`, () => {
    it('Should debit an account successfully', (done) => {
      const login = {
        email: 'anthony.a@gmail.com',
        password: 'user2pw'
      };
      request
        .post(`${usersEndPoint}signin`)
        .send(login)
        .end((usrLoginErr, usrLoginRes) => {
          const token = `Bearer ${usrLoginRes.body.data.token}`;
          request
            .post(`${transactionEndPoint}3839943693/debit`)
            .set('content-type', 'application/json')
            .set('Authorization', token)
            .send({ ammount: 150.75 })
            .end((err, res) => {
              expect(res.status).to.equal(201);
              expect(res.body).to.have.property('data');
              expect(res.body.data).to.be.an('object');
              expect(res.body.data).to.have.property('transactionId');
              expect(res.body.data).to.have.property('cashier');
              expect(res.body.data).to.have.property('transactionType');
              expect(res.body.data).to.have.property('accountBalance');
              done();
            });
        });
    });
  });
});
