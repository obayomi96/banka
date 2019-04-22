import uuidv4 from 'uuid/v4';
import client from '../models/index';
import accounts from '../data/accounts';

export default class AccountController {
  /**
    * @method createAccount
    * @description Creates a new bank account
    * @param {object} req - The Request Object
    * @param {object} res - The Response Object
    */
  static async createAccount(req, res) {
    const { body: { initialDeposit, type } } = req;
    const accNoGen = Math.floor(Math.random() * 1000000000).toString();
    const accountNumber = accNoGen;
    const owner = req.user.id;

    const accountId = uuidv4();
    const account = [
      accountId,
      accountNumber,
      owner,
      new Date(),
      type,
      'draft',
      parseFloat(initialDeposit)
    ];
    await client.query('SELECT 1 FROM accounts WHERE owner = $1', [owner], (err, data) => {
      console.log('err', err);
      console.log('data', data);
      if (data.rowCount > 0) {
        return res.status(409).json({
          status: res.statusCode,
          msg: 'You have an existing bank account!'
        });
      }
      const query = 'INSERT INTO accounts (id, accountnumber, owner, createdon, type, status, balance) VALUES ($1, $2, $3, $4, $5, $6, $7)';
      const accountData = {
        id: accountId,
        accountNumber: account[1],
        firstname: req.user.firstname,
        lastname: req.user.lastname,
        email: req.user.email,
        type: account[4],
        status: account[5],
        openingbalance: account[6]
      };
      client.query(query, account, (insertErr) => {
        console.log('insertErr', insertErr);
        if (insertErr) {
          return res.status(500).json({
            msg: 'Internal server error'
          });
        }
        return res.status(201).json({
          status: res.statusCode,
          data: {
            id: account[0],
            accountNumber: account[1],
            firstname: accountData.firstname,
            lastname: accountData.lastname,
            email: accountData.email,
            type: accountData.type,
            openingbalance: accountData.openingbalance
          },
          msg: 'Account created successfully'
        });
      });
    });
  }

  /**
    * @method accountStatus
    * @description changes the account status by activating or deactivating it
    * @param {object} req - The Request Object
    * @param {object} res - The Response Object
    */
  static accountStatus(req, res) {
    const { status } = req.body;
    const { accountNumber } = req.params;
    const validAccount = accounts.find(eachAccount => eachAccount.accountNumber === parseInt(accountNumber, 10));
    if (validAccount) {
      return res.status(200).json({
        status: res.statusCode,
        data: {
          accountNumber,
          status
        }
      });
    }
    return res.status(404).json({
      status: res.statusCode,
      error: `Account ${accountNumber} does not exist`
    });
  }

  /**
    * @method deleteAccount
    * @description Deletes a specific account
    * @param {object} req - The Request Object
    * @param {object} res - The Response Object
    */
  static deleteAccount(req, res) {
    const { accountNumber } = req.params;
    const validAccount = accounts.find(eachAccount => eachAccount.accountNumber === parseInt(accountNumber, 10));
    if (!validAccount) {
      return res.status(404).json({
        status: res.statusCode,
        error: `Account ${accountNumber} does not exist`
      });
    }
    accounts.forEach((account) => {
      if (account.accountNumber === parseInt(accountNumber, 10)) {
        const indexNumber = accounts.indexOf(account);
        accounts.splice(indexNumber, 1);
        return res.status(200).json({
          status: res.statusCode,
          msg: 'Account successfully deleted!'
        });
      }
    });
  }
}
