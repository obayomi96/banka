import uuidv4 from 'uuid/v4';
import client from '../migrations/db';

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
    const owner = req.user.email;

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
    await client.query('SELECT * FROM accounts WHERE owner = $1', [owner], (err, data) => {
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
  static async accountStatus(req, res) {
    const { status } = req.body;
    const { accountNumber } = req.params;

    await client.query('SELECT * FROM accounts WHERE accountnumber = $1', [accountNumber], (err, data) => {
      if (data.rowCount === 0) {
        return res.status(404).json({
          status: res.statusCode,
          msg: 'Account not found'
        });
      }
      const query = 'UPDATE accounts SET status = $1 WHERE accountnumber = $2';
      client.query(query, [status, accountNumber], (updateErr) => {
        if (updateErr) {
          return res.status(500).json({
            msg: 'internal server error'
          });
        }
        return res.status(200).json({
          status: res.statusCode,
          data: {
            accountNumber,
            status
          },
          msg: 'Account status updated successfully'
        });
      });
    });
  }

  /**
    * @method deleteAccount
    * @description Deletes a specific account
    * @param {object} req - The Request Object
    * @param {object} res - The Response Object
    */
  static async deleteAccount(req, res) {
    const { accountNumber } = req.params;
    await client.query('SELECT * FROM accounts WHERE accountnumber = $1', [accountNumber], (err, data) => {
      if (data.rowCount === 0) {
        return res.status(404).json({
          status: res.statusCode,
          msg: 'Account not found'
        });
      }
      const query = 'DELETE FROM accounts WHERE accountnumber = $1';
      client.query(query, [accountNumber], (deleteErr) => {
        if (deleteErr) {
          return res.status(500).json({
            msg: 'Internal server error'
          });
        }
        return res.status(200).json({
          status: res.statusCode,
          msg: 'Account deleted successfully!'
        });
      });
    });
  }

  /**
    * @method viewAccount
    * @description User viewaccount details
    * @param {object} req - The Request Object
    * @param {object} res - The Response Object
    */
  static async viewAccount(req, res) {
    const { accountNumber } = req.params;
    await client.query('SELECT * FROM accounts WHERE accountNumber = $1', [accountNumber], (err, data) => {
      if (req.user.type !== 'client') {
        return res.status(403).json({
          status: res.statusCode,
          msg: 'You are forbidden to view this endpoint'
        });
      }
      if (data.rowCount === 0) {
        return res.status(404).json({
          status: res.statusCode,
          msg: 'Account not found'
        });
      }
      const accountDetails = [
        data.rows[0].id,
        data.rows[0].balance,
        req.user.id,
        data.rows[0].createdon,
        data.rows[0].type,
        req.user.email,
        data.rows[0].status,
      ];
      const query = 'SELECT * FROM accounts WHERE accountnumber = $1';
      client.query(query, [accountNumber], (selectErr) => {
        if (selectErr) {
          return res.status(500).json({
            msg: 'Internal server error'
          });
        }
        return res.status(200).json({
          status: res.statusCode,
          data: {
            createdOn: accountDetails[3],
            accountNumber,
            ownerEmail: accountDetails[5],
            type: accountDetails[4],
            status: accountDetails[6],
            balance: accountDetails[1]
          }
        });
      });
    });
  }

  /**
    * @method viewAllAccounts
    * @description Admin/staff viewAllAccounts
    * @param {object} req - The Request Object
    * @param {object} res - The Response Object
    */
  static async viewAllAccounts(req, res) {
    if (req.user.type !== 'staff' || req.user.isAdmin !== true) {
      return res.status(403).json({
        status: res.statusCode,
        msg: 'You are fobidden to view this endpoint'
      });
    }
    // const query = 'SELECT * FROM accounts ';
    let query = 'SELECT * FROM accounts, users WHERE accounts.owner = users.id';
    const { status } = req.query;
    if (status) {
      query += ' AND status = $1';
      await client.query(query, [status], (queryErr, queryData) => {
        const accountDetails = queryData.rows.map(each => ({
          createdOn: each.createdon,
          accountNumber: each.accountnumber,
          ownerEmail: each.email,
          type: each.type,
          status: each.status,
          balance: each.balance
        }));
        if (queryData.rowCount > 0) {
          return res.status(200).json({
            status: res.statusCode,
            data: accountDetails
          });
        }
        return res.status(404).json({
          status: res.statusCode,
          msg: 'No Accounts found'
        });
      });
    } else {
      await client.query(query, (err, data) => {
        if (data.rowCount === 0) {
          return res.status(404).json({
            status: res.statusCode,
            msg: 'No Accounts found'
          });
        }
        const accountDetails = data.rows.map(each => ({
          createdOn: each.createdon,
          accountNumber: each.accountnumber,
          ownerEmail: each.email,
          type: each.type,
          status: each.status,
          balance: each.balance
        }));
        return res.status(200).json({
          status: res.statusCode,
          data: accountDetails
        });
      });
    }
  }

  /**
    * @method getTransactionHistory
    * @description user can  view all transaction history
    * @param {object} req - The Request Object
    * @param {object} res - The Response Object
    */
  static async getTransactionHistory(req, res) {
    const { accountNumber } = req.params;
    const { type } = req.user;
    if (type !== 'client') {
      return res.status(403).json({
        status: res.statusCode,
        msg: 'You are forbidden to view this endpoint'
      });
    }
    await client.query('SELECT * FROM accounts WHERE accountnumber = $1', [accountNumber], (err, data) => {
      if (data.rowCount === 0) {
        return res.status(404).json({
          status: res.statusCode,
          msg: 'Account not found'
        });
      }
      const query = 'SELECT * FROM transactions WHERE accountnumber = $1';
      client.query(query, [accountNumber], (selectErr, transactions) => {
        if (selectErr) {
          return res.status(500).json({
            msg: 'Internal server error'
          });
        }
        return res.status(200).json({
          status: res.statusCode,
          data: transactions.rows
        });
      });
    });
  }
}
