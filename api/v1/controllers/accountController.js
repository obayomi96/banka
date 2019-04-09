import accounts from '../data/accounts';

export default class AccountController {
  /**
    * @method createAccount
    * @description Creates a new bank account
    * @param {object} req - The Request Object
    * @param {object} res - The Response Object
    */
  static createAccount(req, res) {
    const { body: { initialDeposit, type } } = req;
    const id = accounts.length + 1;
    const accNoGen = Math.floor(Math.random() * 10000000000);
    const accountNumber = accNoGen;
    const owner = req.user.id;
    const account = {
      id,
      accountNumber,
      createdOn: new Date(),
      owner,
      type,
      status: 'draft',
      balance: initialDeposit
    };
    accounts.push(account);
    return res.status(201).json({
      status: true,
      data: {
        accountNumber: account.accountNumber,
        firstname: req.user.firstname,
        lastname: req.user.lastname,
        email: req.user.email,
        type: account.type,
        openingBalance: account.balance,
      },
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
        status: true,
        data: {
          accountNumber,
          status
        }
      });
    }
    return res.status(404).json({
      status: true,
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
        status: false,
        error: `Account ${accountNumber} does not exist`
      });
    }
    accounts.forEach((account) => {
      if (account.accountNumber === parseInt(accountNumber, 10)) {
        const indexNumber = accounts.indexOf(account);
        accounts.splice(indexNumber, 1);
        return res.status(200).json({
          status: res.statusCode,
          msg: `Account ${accountNumber} is successfully deleted!`
        });
      }
    });
  }
}
