import { expect } from 'chai';
import supertest from 'supertest';
import app from '../app';

const request = supertest(app);
const apiEndPoint = '/api/v1/';
const usersEndPoint = `${apiEndPoint}auth/`;
const transactionEndPoint = `${apiEndPoint}transactions/`;

describe(`POST ${transactionEndPoint}:accountNumber/credit`, () => {
//   it('Should credit an account successfully', (done) => {
//     const login = {
//       email: 'anthony.a@gmail.com',
//       password: 'user2pw'
//     };
//     request
//       .post(`${usersEndPoint}signin`)
//       .send(login)
//       .end((usrLoginErr, usrLoginRes) => {
//         const token = `Bearer ${usrLoginRes.body.data.token}`;
//         const amount = 1000.45;
//         request
//           .post(`${transactionEndPoint}3839943693/credit`)
//           .set('content-type', 'application/json')
//           .set('Authorization', token)
//           .send({ amount })
//           .end((err, res) => {
//             expect(res.status).to.equal(201);
//             expect(res.body).to.have.property('data');
//             expect(res.body.data).to.be.an('object');
//             expect(res.body.data.amount).to.equal(amount);
//             done();
//           });
//       });
//   });
//   it('Should return 400 if amount field is empty', (done) => {
//     request
//       .post(`${transactionEndPoint}3839943693/credit`)
//       .send({ amount: undefined })
//       .end((err, res) => {
//         expect(res.status).to.equal(400);
//         expect(res.body).to.be.an('object');
//         expect(res.body).to.have.property('error');
//         done();
//       });
//   });
//   it('Should return 400 if amount is not a numeric value', (done) => {
//     request
//       .post(`${transactionEndPoint}3839943693/credit`)
//       .send({ amount: 'cycle43!' })
//       .end((err, res) => {
//         expect(res.status).to.equal(400);
//         expect(res.body).to.be.an('object');
//         expect(res.body).to.have.property('error');
//         done();
//       });
//   });
});
describe(`POST ${transactionEndPoint}:accountNumber/debit`, () => {
//   it('Should debit an account successfully', (done) => {
//     const login = {
//       email: 'anthony.a@gmail.com',
//       password: 'user2pw'
//     };
//     request
//       .post(`${usersEndPoint}signin`)
//       .send(login)
//       .end((usrLoginErr, usrLoginRes) => {
//         const token = `Bearer ${usrLoginRes.body.data.token}`;
//         const amount = 150.50;
//         request
//           .post(`${transactionEndPoint}3839943693/debit`)
//           .set('content-type', 'application/json')
//           .set('Authorization', token)
//           .send({ amount })
//           .end((err, res) => {
//             expect(res.status).to.equal(201);
//             expect(res.body).to.have.property('data');
//             expect(res.body.data).to.be.an('object');
//             expect(res.body.data.amount).to.equal(amount);
//             done();
//           });
//       });
//   });
  // it('Should return 400 if amount field is empty', (done) => {
  //   const login = {
  //     email: 'anthony.a@gmail.com',
  //     password: 'user2pw'
  //   };
  //   request
  //     .post(`${usersEndPoint}signin`)
  //     .send(login)
  //     .end((usrLoginErr, usrLoginRes) => {
  //       const token = `Bearer ${usrLoginRes.body.data.token}`;
  //       request
  //         .post(`${transactionEndPoint}3839943693/debit`)
  //         .set('content-type', 'application/json')
  //         .set('Authorization', token)
  //         .send({ amount: undefined })
  //         .end((err, res) => {
  //           expect(res.status).to.equal(400);
  //           expect(res.body).to.be.an('object');
  //           expect(res.body).to.have.property('error');
  //           done();
  //         });
  //     });
  // });
  // it('Should return 400 if amount is not a numeric value', (done) => {
  //   const login = {
  //     email: 'anthony.a@gmail.com',
  //     password: 'user2pw'
  //   };
  //   request
  //     .post(`${usersEndPoint}signin`)
  //     .send(login)
  //     .end((usrLoginErr, usrLoginRes) => {
  //       const token = `Bearer ${usrLoginRes.body.data.token}`;
  //       request
  //         .post(`${transactionEndPoint}3839943693/debit`)
  //         .set('content-type', 'application/json')
  //         .set('Authorization', token)
  //         .send({ amount: 'cycl3!e' })
  //         .end((err, res) => {
  //           expect(res.status).to.equal(400);
  //           expect(res.body).to.be.an('object');
  //           expect(res.body).to.have.property('error');
  //           done();
  //         });
  //     });
  // });
});
