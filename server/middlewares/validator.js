import {
  check,
  param,
  query,
  validationResult,
  oneOf
} from 'express-validator/check';

const userSignup = [
  check('firstname').not().isEmpty().withMessage('First field name is required'),
  check('firstname').isAlpha().trim().withMessage('Firstname can only be letters'),
  check('lastname').not().isEmpty().withMessage('Lastname field is required'),
  check('lastname').isAlpha().trim().withMessage('Lastname can only be letters'),
  check('email').isEmail().trim().withMessage('Please use a valid email address'),
  check('email').not().isEmpty().withMessage('Email field is required'),
  check('password').not().isEmpty().withMessage('Password field is required'),
  check('password').trim().isLength({ min: 4 }).withMessage('Password must be at least 4 chars long'),
  (req, res, next) => {
    const errors = validationResult(req);
    const errorMsg = [];
    if (!errors.isEmpty()) {
      errors.array().forEach((error) => {
        errorMsg.push(error.msg);
      });
      return res.status(400).json({
        status: 400,
        error: errorMsg
      });
    }
    return next();
  }
];

const userSignin = [
  check('email').not().isEmpty().withMessage('Email field is required'),
  check('email').isEmail().trim().withMessage('Please use a valid email address'),
  check('password').not().isEmpty().withMessage('Password field is required'),
  (req, res, next) => {
    const errors = validationResult(req);
    const errorMsg = [];
    if (!errors.isEmpty()) {
      errors.array().forEach((error) => {
        errorMsg.push(error.msg);
      });
      return res.status(400).json({
        status: 400,
        error: errorMsg
      });
    }
    return next();
  }
];

const typeMessage = 'Account type must be current or savings';
const createAccount = [
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
      return res.status(400).json({
        status: 400,
        error: errorMsg
      });
    }
    return next();
  }
];

const statusMessage = 'Account status must be dormant or active';
const accountStatus = [
  param('accountNumber').not().isEmpty().withMessage('Please parse an account number as params'),
  param('accountNumber').isNumeric().trim().withMessage('Invalid! account number can only be a numeric value'),
  check('status').not().isEmpty().withMessage('Please specify new account status'),
  oneOf([
    check('status').equals('dormant'),
    check('status').equals('active')
  ], statusMessage),
  (req, res, next) => {
    const errors = validationResult(req);
    const errorMsg = [];
    if (!errors.isEmpty()) {
      errors.array().forEach((error) => {
        errorMsg.push(error.msg);
      });
      return res.status(400).json({
        status: 400,
        error: errorMsg
      });
    }
    return next();
  }
];

const queryMessage = 'You can only view active or dormant accounts';
const queryStatusEndpoint = [
  query('status').isAlpha().trim().withMessage('Please input a valid parameter'),
  oneOf([
    query('status').equals('active').trim(),
    query('status').equals('dormant').trim()
  ], queryMessage),
  (req, res, next) => {
    const errors = validationResult(req);
    const errorMsg = [];
    if (!errors.isEmpty()) {
      errors.array().forEach((error) => {
        errorMsg.push(error.msg);
      });
      return res.status(400).json({
        status: 400,
        error: errorMsg
      });
    }
    return next();
  }
];

const creditAccount = [
  check('amount').not().isEmpty().withMessage('Please input an amount to credit this account'),
  check('amount').isNumeric().withMessage('Please input a valid amount to credit this account'),
  check('amount').isLength({ min: 0 }).withMessage('Amount cannot be lower than 0.00'),
  param('accountNumber').not().isEmpty().withMessage('Please parse an account number as params'),
  param('accountNumber').isNumeric().trim().withMessage('Invalid! account number can only be a numeric value'),
  (req, res, next) => {
    const errors = validationResult(req);
    const errorMsg = [];
    if (!errors.isEmpty()) {
      errors.array().forEach((error) => {
        errorMsg.push(error.msg);
      });
      return res.status(400).json({
        status: 400,
        error: errorMsg
      });
    }
    return next();
  }
];

const debitAccount = [
  check('amount').not().isEmpty().withMessage('Please input an amount to debit this account'),
  check('amount').isNumeric().trim().withMessage('Please input a valid amount to debit this account'),
  check('amount').isLength({ min: 0 }).withMessage('Amount cannot be lower than 0.00'),
  param('accountNumber').not().isEmpty().withMessage('Please parse an account number as params'),
  param('accountNumber').isNumeric().trim().withMessage('Invalid! account number can only be a numeric value'),
  (req, res, next) => {
    const errors = validationResult(req);
    const errorMsg = [];
    if (!errors.isEmpty()) {
      errors.array().forEach((error) => {
        errorMsg.push(error.msg);
      });
      return res.status(400).json({
        status: 400,
        error: errorMsg
      });
    }
    return next();
  }
];

const deleteAccount = [
  param('accountNumber').not().isEmpty().withMessage('Please parse an account number as param'),
  param('accountNumber').isNumeric().withMessage('Invalid! account number can only be a numeric value'),
  (req, res, next) => {
    const errors = validationResult(req);
    const errorMsg = [];
    if (!errors.isEmpty()) {
      errors.array().forEach((error) => {
        errorMsg.push(error.msg);
      });
      return res.status(400).json({
        status: 400,
        error: errorMsg
      });
    }
    return next();
  }
];

const accountNumberParams = [
  param('accountNumber').isNumeric().withMessage('Invalid! account number can only be a numeric value'),
  (req, res, next) => {
    const errors = validationResult(req);
    const errorMsg = [];
    if (!errors.isEmpty()) {
      errors.array().forEach((error) => {
        errorMsg.push(error.msg);
      });
      return res.status(400).json({
        status: 400,
        error: errorMsg
      });
    }
    return next();
  }
];

const emailParams = [
  param('userEmail').isEmail().trim().withMessage('Please use a valid email address'),
  (req, res, next) => {
    const errors = validationResult(req);
    const errorMsg = [];
    if (!errors.isEmpty()) {
      errors.array().forEach((error) => {
        errorMsg.push(error.msg);
      });
      return res.status(400).json({
        status: 400,
        error: errorMsg
      });
    }
    return next();
  }
];

const transactionIdParams = [
  param('transactionId').not().isEmpty().withMessage('Please parse a valid transactionId'),
  (req, res, next) => {
    const errors = validationResult(req);
    const errorMsg = [];
    if (!errors.isEmpty()) {
      errors.array().forEach((error) => {
        errorMsg.push(error.msg);
      });
      return res.status(400).json({
        status: 400,
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
  queryStatusEndpoint,
  creditAccount,
  debitAccount,
  deleteAccount,
  accountNumberParams,
  emailParams,
  transactionIdParams
};
