import { expect } from 'chai';
import supertest from 'supertest';
import app from '../app';

const request = supertest(app);
const apiEndPoint = '/api/v1/';
const usersEndPoint = `${apiEndPoint}auth/`;

describe('Users auth Tests', () => {
  describe(`POST ${usersEndPoint}signup`, () => {
    it('Should create a new user', (done) => {
      const user = {
        email: 'newUsr@mail.com',
        firstname: 'newUsrFirstname',
        lastname: 'newUsrLastname',
        password: 'newUsrPW'
      };
      request
        .post(`${usersEndPoint}signup`)
        .set('content-type', 'application/json')
        .send(user)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(201);
          expect(res.body).to.be.an('object');
          expect(res.body.status).to.equal(201);
          expect(res.body).to.have.property('data');
          expect(res.body.data).to.be.an('object');
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.equal('Account created successfully!');
          expect(res.body.data).to.be.an('object');
          expect(res.body.data).to.have.property('token');
          expect(res.body.data).to.have.property('id');
          expect(res.body.data.id).to.be.a('string');
          expect(res.body.data).to.have.property('email');
          expect(res.body.data.email).to.be.a('string');
          expect(res.body.data).to.have.property('firstname');
          expect(res.body.data.firstname).to.be.a('string');
          expect(res.body.data).to.have.property('lastname');
          expect(res.body.data.lastname).to.be.a('string');
          done();
        });
    });
    it('Should return 409 if user email already exist', (done) => {
      const user = {
        firstname: 'Oluwaseun',
        lastname: 'Christopher',
        email: 'newUsr@mail.com',
        password: 'userPW'
      };
      request
        .post(`${usersEndPoint}signup`)
        .send(user)
        .end((err, res) => {
          expect(res.status).to.equal(409);
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.equal('User already exists!');
          done();
        });
    });
    it('Should return 400 if firstname is empty', (done) => {
      const user = {
        lastname: 'Christopher',
        email: 'oluwaseun@mail.com',
        password: 'userPW'
      };
      request
        .post(`${usersEndPoint}signup`)
        .send(user)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('error');
          done();
        });
    });
    it('Should return 400 if lastname is empty', (done) => {
      const user = {
        firstname: 'Oluwaseun',
        email: 'oluwaseun@mail.com',
        password: 'userPW'
      };
      request
        .post(`${usersEndPoint}signup`)
        .send(user)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('error');
          done();
        });
    });
    it('Should return 400 if email is empty', (done) => {
      const user = {
        firstname: 'Oluwaseun',
        lastname: 'Christopher',
        password: 'userPW'
      };
      request
        .post(`${usersEndPoint}signup`)
        .send(user)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('error');
          done();
        });
    });
    it('Should return 400 if password is empty', (done) => {
      const user = {
        firstname: 'Oluwaseun',
        lastname: 'Christopher',
        email: 'oluwaseun@mail.com'
      };
      request
        .post(`${usersEndPoint}signup`)
        .send(user)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('error');
          done();
        });
    });
  });

  describe(`POST ${usersEndPoint}signin`, () => {
    it('Should login a valid user', (done) => {
      const login = {
        email: 'newUsr@mail.com',
        password: 'newUsrPW'
      };
      request
        .post(`${usersEndPoint}signin`)
        .set('content-type', 'application/json')
        .send(login)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body).to.be.a('object');
          expect(res.body.status).to.equal(200);
          expect(res.body).to.have.property('data');
          expect(res.body.data).to.be.a('object');
          expect(res.body.data).to.have.property('token');
          expect(res.body.data.token).to.be.a('string');
          expect(res.body.data).to.have.property('firstname');
          expect(res.body.data.firstname).to.be.a('string');
          expect(res.body.data).to.have.property('lastname');
          expect(res.body.data.lastname).to.be.a('string');
          expect(res.body.data).to.have.property('email');
          expect(res.body.data.email).to.be.a('string');
          expect(res.body.data).to.have.property('isadmin');
          done();
        });
    });
    it('Should return 400 if email field is empty', (done) => {
      const login = {
        email: '',
        password: 'user4pw'
      };
      request
        .post(`${usersEndPoint}signin`)
        .send(login)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('error');
          done();
        });
    });
    it('Should return 400 if password field is empty', (done) => {
      const login = {
        email: 'emmatexi@gmail.com',
        password: ''
      };
      request
        .post(`${usersEndPoint}signin`)
        .send(login)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('error');
          done();
        });
    });
    it('Should return 404 if the user is not found', (done) => {
      const login = {
        email: 'whatever@email.com',
        password: 'whateverPW'
      };
      request
        .post(`${usersEndPoint}signin`)
        .send(login)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.equal('User not found');
          done();
        });
    });
  });
});
