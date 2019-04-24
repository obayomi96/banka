import uuidv4 from 'uuid/v4';
import client from '../migrations/db';
import transactions from '../data/transactions';
import accounts from '../data/accounts';

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
        parseFloat((data.rows[0].balance + parseFloat(amount))).toFixed(2)
      ];

      const query = 'UPDATE accounts SET balance = $1 WHERE accountnumber = $2';
      client.query(query, [transaction[6], transaction[3]], (updateErr) => {
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
              amount: transaction[5],
              cashier: transaction[4],
              transactionType: transaction[2],
              accountBalance: transaction[7]
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
  static debitAccount(req, res) {
    const { amount } = req.body;
    const { accountNumber } = req.params;
    const validAccount = accounts.find(eachAccount => eachAccount.accountNumber === parseInt(accountNumber, 10));
    if (!validAccount) {
      return res.status(404).json({
        status: res.statusCode,
        error: `Account ${accountNumber} does not exist`
      });
    }
    const transaction = {
      id: transactions.length + 1,
      createdOn: new Date(),
      type: 'debit',
      accountNumber: parseInt(accountNumber, 10),
      cashier: req.user.id,
      amount: parseFloat(amount),
      oldBalance: validAccount.balance,
      newBalance: parseFloat((validAccount.balance - parseFloat(amount)).toFixed(2))
    };

    validAccount.balance = transaction.newBalance;
    transactions.push(transaction);

    return res.status(201).json({
      status: res.statusCode,
      data: {
        transactionId: transaction.id,
        accountNumber,
        amount: transaction.amount,
        cashier: transaction.cashier,
        transactionType: transaction.type,
        accountBalance: `Balance: ${transaction.newBalance}`
      }
    });
  }
}
