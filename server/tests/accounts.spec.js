/* eslint-disable no-plusplus */
import { expect } from 'chai';
import supertest from 'supertest';
import app from '../app';

const request = supertest(app);
const apiEndPoint = '/api/v1/';
const usersEndPoint = `${apiEndPoint}auth/`;
const accountEndPoint = `${apiEndPoint}accounts/`;

describe(`POST ${accountEndPoint}`, () => {
  it('Should create a bank account', (done) => {
    const signup = {
      firstname: 'testfirstname',
      lastname: 'testlastname',
      email: 'test@mail.com',
      password: 'testPW'
    };
    request
      .post(`${usersEndPoint}signup`)
      .send(signup)
      .end((usrLoginErr, usrLoginRes) => {
        const token = `Bearer ${usrLoginRes.body.data.token}`;
        const usrInput = {
          type: 'current',
          initialDeposit: 50.50
        };
        request
          .post(`${accountEndPoint}`)
          .set('Authorization', token)
          .send(usrInput)
          .end((err, res) => {
            if (err) return done(err);
            expect(res.status).to.equal(201);
            expect(res.body).to.have.property('status');
            expect(res.body.status).to.equal(201);
            expect(res.body).to.have.property('data');
            expect(res.body.data).to.be.an('object');
            expect(res.body.data).to.have.property('id');
            expect(res.body.data.id).to.be.a('string');
            expect(res.body.data).to.have.property('accountNumber');
            expect(res.body.data.accountNumber).to.be.a('string');
            expect(res.body.data).to.have.property('firstname');
            expect(res.body.data.firstname).to.be.a('string');
            expect(res.body.data.firstname).to.equal(signup.firstname);
            expect(res.body.data).to.have.property('lastname');
            expect(res.body.data.lastname).to.be.a('string');
            expect(res.body.data.lastname).to.equal(signup.lastname).to.be.a('string');
            expect(res.body.data.email).to.equal(signup.email);
            expect(res.body.data).to.have.property('type');
            expect(res.body.data.type).to.be.a('string');
            expect(res.body.data).to.have.property('openingbalance');
            expect(res.body.data.openingbalance).to.equal(usrInput.initialDeposit);
            done();
          });
      });
  });
  it('Should return 400 if account type and initial deposit fields are empty', (done) => {
    const userInput = {
      type: '',
      initialDeposit: ''
    };
    request
      .post(`${accountEndPoint}`)
      .send(userInput)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('error');
        done();
      });
  });
  it('Should return 400 if account type field is empty', (done) => {
    const userInput = {
      type: '',
      initialDeposit: '120.00'
    };
    request
      .post(`${accountEndPoint}`)
      .send(userInput)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('error');
        done();
      });
  });
  it('Should return 400 if initial deposit field is empty', (done) => {
    const userInput = {
      type: 'savings',
      initialDeposit: ''
    };
    request
      .post(`${accountEndPoint}`)
      .send(userInput)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('error');
        done();
      });
  });
  it('Should return 400 if initial deposit is not a numeric value', (done) => {
    const userInput = {
      type: 'savings',
      initialDeposit: 'depo#sit'
    };
    request
      .post(`${accountEndPoint}`)
      .send(userInput)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('error');
        done();
      });
  });
  describe(`PATCH ${accountEndPoint}:accountNumber`, () => {
    // it('Should update an account status', (done) => {
    //   const signup = {
    //     firstname: 'testfirstname',
    //     lastname: 'testlastname',
    //     email: 'test@mail.com',
    //     password: 'testPW'
    //   };
    //   request
    //     .post(`${usersEndPoint}signup`)
    //     .send(signup)
    //     .end((usrSignupErr, usrSignupRes) => {
    //       const token = `Bearer ${usrSignupRes.body.data.token}`;
    //       const status = { status: 'active' };
    //       request
    //         .patch(`${accountEndPoint}3839943693`)
    //         .set('Authorization', token)
    //         .send({ status })
    //         .end((err, res) => {
    //           expect(res.status).to.equal(200);
    //           expect(res.body).to.have.property('data');
    //           expect(res.body.data).to.be.an('object');
    //           expect(res.body.data.status).to.equal(status);
    //           done();
    //         });
    //     });
    // });
    it('Should return 400 if account status is not specified', (done) => {
      request
        .patch(`${accountEndPoint}3839943693`)
        .send({})
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('error');
          done();
        });
    });
    it('Should return 400 if account status is not active or dormant', (done) => {
      request
        .patch(`${accountEndPoint}3839943693`)
        .send({ status: 'someText' })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('error');
          done();
        });
    });
  });
//   describe(`DELETE ${accountEndPoint}:accountNumber`, () => {
//     it('Should delete an account successfully', (done) => {
//       const login = {
//         email: 'martinsoluwaseun47@gmail.com',
//         password: 'user1pw'
//       };
//       request
//         .post(`${usersEndPoint}signin`)
//         .send(login)
//         .end((usrLoginErr, usrLoginRes) => {
//           const token = `Bearer ${usrLoginRes.body.data.token}`;
//           request
//             .delete(`${accountEndPoint}2239002933`)
//             .set('content-type', 'application/json')
//             .set('Authorization', token)
//             .send({ accountNumber: 2239002933 })
//             .end((err, res) => {
//               expect(res.status).to.equal(200);
//               expect(res.body).to.have.property('msg');
//               done();
//             });
//         });
//     });
//   });
});
