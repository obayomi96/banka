import accounts from '../data/accounts';

const accountController = {

  createAccount(req, res) {
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
};

export default accountController;
