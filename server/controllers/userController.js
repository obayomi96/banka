import users from '../data/users';
import auth from '../auth/authenticate';

export default class UserController {
  /**
    * @method signUp
    * @description controller for the user signup API endpoint
    * @param {object} req - The Request Object
    * @param {object} res - The Response Object
    */
  static signUp(req, res) {
    const userInfoInput = { ...req.body };
    const id = users.length + 1;
    const type = 'client';
    const isAdmin = false;

    const user = {
      id,
      email: userInfoInput.email,
      firstname: userInfoInput.firstname,
      lastname: userInfoInput.lastname,
      password: userInfoInput.password,
      type,
      isAdmin
    };
    const token = auth.generateToken({
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      type
    });

    users.push(user);
    return res.status(201).json({
      status: res.statusCode,
      data: {
        token,
        id: user.id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
      }
    });
  }

  /**
    * @method signIn
    * @description controller for the user signin API endpoint
    * @param {object} req - The Request Object
    * @param {object} res - The Response Object
    */
  static signIn(req, res) {
    const { body: { email, password } } = req;
    const validUser = users.find(eachUser => eachUser.email === email && eachUser.password === password);
    if (validUser) {
      const token = auth.generateToken(validUser);
      return res.status(200).json({
        status: res.statusCode,
        data: {
          token,
          id: validUser.id,
          firstname: validUser.firstname,
          lastname: validUser.lastname,
          email: validUser.email
        }
      });
    }
    return res.status(401).json({
      status: res.statusCode,
      msg: 'Authentication failed'
    });
  }
}
