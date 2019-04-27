[![Maintainability](https://api.codeclimate.com/v1/badges/1ee55f40293a3b554e20/maintainability)](https://codeclimate.com/github/obayomi96/banka/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/1ee55f40293a3b554e20/test_coverage)](https://codeclimate.com/github/obayomi96/banka/test_coverage)
[![Build Status](https://travis-ci.org/obayomi96/banka.svg?branch=develop)](https://travis-ci.org/obayomi96/banka)

# banka
Banka is a light-weight core banking application that powers banking operations like account
creation, customer deposit and withdrawals. This app is meant to support a single bank, where
users can signup and create bank accounts online, but must visit the branch to withdraw or
deposit money

# Table of Contents
<a href="#Technologies">Technologies</a>
<a href="#Features">Features</a>
<a href="#Installations">Installation</a>

Currently-
 - HyperText Mark-up Language (HTML)
 - Cascading Style Sheet (CSS)
 - Vanilla javaScript (ES6)
 - Node.js (Express framework)

# Pivotal Tracker
banka project is broken down into smaller tasks with Pivotal Tracker board for project management. The link to the relevant Pivotal Tracker board is (https://www.pivotaltracker.com/n/projects/2319910)

# API Endpoint
The API can be hosted at (https://obayomi-banka.herokuapp.com/api/v1/)

# UI Templates
The application is hosted online on gh-pages at (https://obayomi96.github.io/banka)

# Features
<ul>
<li> User (client) can sign up.</li>
<li> User (client) can login.</li>
<li> User (client) can create an account.</li>
<li> User (client) can view account transaction history.</li>
<li> User (client) can view a specific account transaction.</li>
<li> Staff (cashier) can debit user (client) account.</li>
<li> Staff (cashier) can credit user (client) account.</li>
<li> Admin/staff can view all user accounts.</li>
<li> Admin/staff can view a specific user account.</li>
<li> Admin/staff can activate or deactivate an account.</li>
<li> Admin/staff can delete a specific user account.</li>
<li> Admin can create staff and admin user accounts.</li>
</ul>

# Getting Started
## Installation
- Clone the repository
- run npm install
- run npm run start-dev
- Navigate to localhost:9000 on POSTMAN
- install POSTMAN app to test API Endpoints (https://www.getpostman.com/apps)

# API Endpoint routes
<table>
  <tr>
    <td>HTTP VERB</td>
    <td>ENDPOINT</td>
    <td>TASK</td>
  </tr>
  <tr>
    <td>POST</td>
    <td>/api/v1/auth/signup</td>
    <td>Create user account</td>
  </tr>
  <tr>
    <td>POST</td>
    <td>/api/v1/auth/signin</td>
    <td>Login a user</td>
  </tr>
  <tr>
    <td>POST</td>
    <td>/api/v1/accounts/</td>
    <td>Create a bank account</td>
  </tr>
  <tr>
    <td>PATCH</td>
    <td>/api/v1/accounts/<account-Number></td>
    <td>Update an account status</td>
  </tr>
  <tr>
    <td>DELETE</td>
    <td>/api/v1/accounts/<account-number></td>
    <td>Delete a specific account</td>
  </tr>
    <tr>
    <td>POST</td>
    <td>/api/v1/transactins/<account-number>/debit</td>
    <td>Debit a bank account</td>
  </tr>
  <tr>
    <td>POST</td>
    <td>api/v1/transactins/<account-number>/credit</td>
    <td>credit a bank account</td>
  </tr>
    <tr>
    <td>POST</td>
    <td>/api/v1/auth/signup</td>
    <td>Register a user</td>
  </tr>
   <tr>
    <td>POST</td>
    <td>/api/v1/auth/login</td>
    <td>Login a user</td>
  </tr>
  </table>

# Author
- Martins Obayomi