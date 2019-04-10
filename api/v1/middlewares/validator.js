import { check, validationResult, oneOf } from 'express-validator/check';

const userSignup = [
  check('firstname').not().isEmpty().withMessage('First field name is required'),
  check('firstname').isAlpha().trim().withMessage('Firstname can only be letters'),
  check('lastname').not().isEmpty().withMessage('Lastname field is required'),
  check('lastname').isAlpha().trim().withMessage('Lastname can only be letters'),
  check('email').isEmail().trim().withMessage('Please use a valid email address'),
  check('email').not().isEmpty().withMessage('Email field is required'),
  check('password').not().isEmpty().withMessage('Password field is required'),
  check('password').isLength({ min: 4 }).withMessage('Password must be at least 4 chars long'),
  (req, res, next) => {
    const errors = validationResult(req);
    const errorMsg = [];
    if (!errors.isEmpty()) {
      errors.array().forEach((error) => {
        errorMsg.push(error.msg);
      });
      return res.status(401).json({
        status: 401,
        error: errorMsg
      });
    }
    return next();
  }
];

const userSignin = [
  check('email').not().isEmpty().withMessage('Email field is required'),
  check('password').not().isEmpty().withMessage('Password field is required'),
  (req, res, next) => {
    const errors = validationResult(req);
    const errorMsg = [];
    if (!errors.isEmpty()) {
      errors.array().forEach((error) => {
        errorMsg.push(error.msg);
      });
      return res.status(401).json({
        status: 401,
        error: errorMsg
      });
    }
    return next();
  }
];

const typeMessage = 'Account type must be current or savings';
const createAccount = [
  check('initialDeposit').not().isEmpty().withMessage('You need an initial deposit to create an account'),
  check('initialDeposit').isNumeric().withMessage('Please enter a valid amount in digit'),
  check('type').not().isEmpty().withMessage('Please specify the type of account you want to create'),
  oneOf([
    check('type').equals('savings'),
    check('type').equals('current')
  ], typeMessage),
  (req, res, next) => {
    const errors = validationResult(req);
    const errorMsg = [];
    if (!errors.isEmpty()) {
      errors.array().forEach((error) => {
        errorMsg.push(error.msg);
      });
      return res.status(401).json({
        status: 401,
        error: errorMsg
      });
    }
    return next();
  }
];

const statMessage = 'Account status must be dormant or active';
const accountStatus = [
  check('status').not().isEmpty().withMessage('Please specify new account status'),
  oneOf([
    check('status').equals('dormant'),
    check('status').equals('active')
  ], statMessage),
  (req, res, next) => {
    const errors = validationResult(req);
    const errorMsg = [];
    if (!errors.isEmpty()) {
      errors.array().forEach((error) => {
        errorMsg.push(error.msg);
      });
      return res.status(401).json({
        status: 401,
        error: errorMsg
      });
    }
    return next();
  }
];

const creditAccount = [
  check('amount').not().isEmpty().withMessage('Please input an amount to credit this account'),
  check('amount').isNumeric().withMessage('Please input a valid amount to credit this account'),
  (req, res, next) => {
    const errors = validationResult(req);
    const errorMsg = [];
    if (!errors.isEmpty()) {
      errors.array().forEach((error) => {
        errorMsg.push(error.msg);
      });
      return res.status(401).json({
        status: 401,
        error: errorMsg
      });
    }
    return next();
  }
];

const debitAccount = [
  check('amount').not().isEmpty().withMessage('Please input an amount to debit this account'),
  check('amount').isNumeric().withMessage('Please input a valid amount to debit this account'),
  (req, res, next) => {
    const errors = validationResult(req);
    const errorMsg = [];
    if (!errors.isEmpty()) {
      errors.array().forEach((error) => {
        errorMsg.push(error.msg);
      });
      return res.status(401).json({
        status: 401,
        error: errorMsg
      });
    }
    return next();
  }
];

export default {
  userSignup,
  userSignin,
  createAccount,
  accountStatus,
  creditAccount,
  debitAccount
};
