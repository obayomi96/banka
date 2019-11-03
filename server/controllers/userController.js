import client from '../migrations/db';

export default class UserController {
  /**
    * @method getAllAccountByUser
    * @description get all accounts owned by a specific user
    * @param {object} req - The Request Object
    * @param {object} res - The Response Object
    */
  static async getAllAccountByUser(req, res) {
    const { userEmail } = req.params;
    if (req.user.email !== userEmail) {
      return res.status(403).json({
        status: res.statusCode,
        message: 'You are fobidden to view this endpoint'
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
          data: accountDetails,
          message: 'All accounts owned by this user'
        });
      }
      return res.status(404).json({
        status: res.statusCode,
        message: 'No accounts found'
      });
    });
  }
}
