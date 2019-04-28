import uuidv4 from 'uuid/v4';
import client from '../migrations/db';

export default class TransactionController {
  /**
    * @method creditAccount
    * @description credit a specific account
    * @param {object} req - The Request Object
    * @param {object} res - The Response Object
    */
  static async creditAccount(req, res) {
    const { amount } = req.body;
    const { accountNumber } = req.params;
    await client.query('SELECT * FROM accounts WHERE accountnumber = $1', [accountNumber], (err, data) => {
      if (data.rowCount === 0) {
        return res.status(404).json({
          status: res.statusCode,
          msg: 'Account not found'
        });
      }
      const transId = uuidv4();
      const transaction = [
        transId,
        new Date(),
        'credit',
        accountNumber,
        req.user.id,
        parseFloat(amount),
        data.rows[0].balance,
        parseFloat((data.rows[0].balance + parseFloat(amount)))
      ];

      const query = 'UPDATE accounts SET balance = $1 WHERE accountnumber = $2';
      client.query(query, [transaction[7], transaction[3]], (updateErr) => {
        if (updateErr) {
          return res.status(500).json({
            msg: 'Internal server error'
          });
        }
        const transactionQuery = 'INSERT INTO transactions (id, createdon, type, accountnumber, cashier, amount, oldbalance, newbalance) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)';
        client.query(transactionQuery, transaction, (insertErr) => {
          if (insertErr) {
            return res.status(500).json({
              msg: 'Internal server error'
            });
          }
          return res.status(201).json({
            status: res.statusCode,
            data: {
              transactionId: transaction[0],
              accountNumber: transaction[3],
              amount: transaction[5].toFixed(2),
              cashier: transaction[4],
              transactionType: transaction[2],
              accountBalance: transaction[7].toFixed(2)
            },
            msg: 'Transaction Successfull'
          });
        });
      });
    });
  }

  /**
    * @method creditAccount
    * @description credit a specific account
    * @param {object} req - The Request Object
    * @param {object} res - The Response Object
    */
  static async debitAccount(req, res) {
    const { amount } = req.body;
    const { accountNumber } = req.params;
    await client.query('SELECT * FROM accounts WHERE accountnumber = $1', [accountNumber], (err, data) => {
      if (data.rowCount === 0) {
        return res.status(404).json({
          status: res.statusCode,
          msg: 'Account not found'
        });
      }
      const transId = uuidv4();
      const transaction = [
        transId,
        new Date(),
        'debit',
        accountNumber,
        req.user.id,
        parseFloat(amount),
        data.rows[0].balance,
        parseFloat((data.rows[0].balance - parseFloat(amount)))
      ];

      const query = 'UPDATE accounts SET balance = $1 WHERE accountnumber = $2';
      client.query(query, [transaction[7], transaction[3]], (updateErr) => {
        if (updateErr) {
          return res.status(500).json({
            msg: 'Internal server error'
          });
        }
        const transactionQuery = 'INSERT INTO transactions (id, createdon, type, accountnumber, cashier, amount, oldbalance, newbalance) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)';
        client.query(transactionQuery, transaction, (insertErr) => {
          if (insertErr) {
            return res.status(500).json({
              msg: 'Internal server error'
            });
          }
          return res.status(201).json({
            status: res.statusCode,
            data: {
              transactionId: transaction[0],
              accountNumber: transaction[3],
              amount: transaction[5].toFixed(2),
              cashier: transaction[4],
              transactionType: transaction[2],
              accountBalance: transaction[7].toFixed(2)
            },
            msg: 'Transaction Successfull'
          });
        });
      });
    });
  }

  /**
    * @method getSpecificTransaction
    * @description Get a specific transaction
    * @param {object} req - The Request Object
    * @param {object} res - The Response Object
    */
  static async getSpecificTransaction(req, res) {
    const { transactionId } = req.params;

    const { type } = req.user;
    if (type !== 'client' || type !== 'staff') {
      return res.status(403).json({
        status: res.statusCode,
        msg: 'You are forbidden to view this endpoint'
      });
    }
    const query = 'SELECT * FROM transactions WHERE id = $1';
    await client.query(query, [transactionId], (err, data) => {
      if (data.rowCount > 0) {
        return res.status(200).json({
          status: res.statusCode,
          data: data.rows[0]
        });
      }
      return res.status(404).json({
        status: res.statusCode,
        msg: 'transaction not found'
      });
    });
  }
}
