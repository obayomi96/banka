import bcrypt from 'bcryptjs';
import auth from '../auth/authenticate';
import client from '../migrations/db';

export default class UserController {
  /**
    * @method signUp
    * @description controller for the user signup API endpoint
    * @param {object} req - The Request Object
    * @param {object} res - The Response Object
    */
  static async signUp(req, res) {
    const {
      firstname,
      lastname,
      email,
      password
    } = req.body;
    const hashed = await bcrypt.hashSync(password, 10);
    const user = [
      firstname,
      lastname,
      email,
      hashed,
      'client',
      false
    ];
    await client.query('SELECT * FROM users WHERE email = $1', [email], (err, data) => {
      if (data.rowCount > 0) {
        return res.status(409).json({
          status: res.statusCode,
          msg: 'User already exists!'
        });
      }
      const token = auth.generateToken({ user });
      const query = 'INSERT INTO users (firstname, lastname, email, password, type, isAdmin) VALUES ($1, $2, $3, $4, $5, $6)';
      client.query(query, user, (insertErr) => {
        if (insertErr) {
          return res.status(500).json({
            msg: 'Internal server error'
          });
        }
        return res.status(201).json({
          status: res.statusCode,
          data: {
            token,
            firstname: user[0],
            lastname: user[1],
            email: user[2],
            password: user[3],
            type: user[4],
            isAdmin: user[5]
          },
          msg: 'Account created successfully!'
        });
      });
    });
  }

  /**
    * @method signIn
    * @description controller for the user signin API endpoint
    * @param {object} req - The Request Object
    * @param {object} res - The Response Object
    */
  static async signIn(req, res) {
    const { body: { email, password } } = req;
    const query = 'SELECT * FROM users WHERE email=$1';
    client.query(query, [email], (err, data) => {
      if (data.rowCount > 0) {
        const compare = bcrypt.compareSync(password, data.rows[0].password);
        if (!compare) {
          return res.status(404).json({
            status: 404,
            error: 'Invalid email or password'
          });
        }
        const user = {
          id: data.rows[0].id,
          email: data.rows[0].email,
          firstname: data.rows[0].firstname,
          lastname: data.rows[0].lastname,
          type: data.rows[0].type,
          isAdmin: data.rows[0].isadmin
        };
        const token = auth.generateToken(user);
        return res.status(200).json({
          status: res.statusCode,
          data: {
            token,
            id: data.rows[0].id,
            firstname: data.rows[0].firstname,
            latename: data.rows[0].lastname,
            email: data.rows[0].email,
          },
          msg: `Login success!, welcome ${user.firstname}`
        });
      }
      return res.status(404).json({
        status: res.statusCode,
        msg: 'User not found'
      });
    });
  }
}
