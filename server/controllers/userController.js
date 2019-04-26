import client from '../migrations/db';

export default class UserController {
  /**
    * @method getAllAccountByUser
    * @description get all accounts a user has a specific account
    * @param {object} req - The Request Object
    * @param {object} res - The Response Object
    */
  static async getAllAccountByUser(req, res) {
    const { userEmail } = req.params;
    if (req.user.type !== 'staff' || req.user.isAdmin !== true) {
      return res.status(403).json({
        status: res.statusCode,
        msg: 'You are fobidden to view this endpoint'
      });
    }
    const query = 'SELECT * FROM accounts, users WHERE accounts.owner = users.id AND email = $1';
    await client.query(query, [userEmail], (err, data) => {
      const accountDetails = data.rows.map(each => ({
        createdOn: each.createdon,
        accountNumber: each.accountnumber,
        ownerEmail: each.email,
        type: each.type,
        status: each.status,
        balance: each.balance
      }));
      if (data.rowCount > 0) {
        return res.status(200).json({
          status: res.statusCode,
          data: accountDetails
        });
      }
      return res.status(404).json({
        status: res.statusCode,
        msg: 'No accounts found'
      });
    });
  }
}
