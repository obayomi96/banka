import bcrypt from 'bcryptjs';
import uuidv4 from 'uuid/v4';
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
    const id = uuidv4();
    const user = [
      id,
      firstname,
      lastname,
      email,
      hashed,
      'client',
      false
    ];
    await client.query('SELECT * FROM users WHERE email = $1', [email], (err, data) => {
      if (data && data.rowCount > 0) {
        return res.status(409).json({
          status: res.statusCode,
          msg: 'User already exists!'
        });
      }
      const token = auth.generateToken({ user });
      const query = 'INSERT INTO users (id, firstname, lastname, email, password, type, isAdmin) VALUES ($1, $2, $3, $4, $5, $6, $7)';
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
            id: user[0],
            firstname: user[1],
            lastname: user[2],
            email: user[3],
            password: user[4],
            type: user[5],
            isAdmin: user[6]
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
            status: res.statusCode,
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
            lastname: data.rows[0].lastname,
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
