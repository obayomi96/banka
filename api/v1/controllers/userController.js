// import jwt from 'jsonwebtoken';
import users from '../data/users';
import auth from '../auth/authenticate';

const userController = {
  // User Signup API endoint
  signUp(req, res) {
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
    const token = auth.generateToken({ email: user.email, type });

    users.push(user);
    return res.status(201).json({
      status: true,
      data: {
        token,
        id: user.id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
      }
    });
  }, // Signup API endpoint ends

  // User Signin API endpoint
  signIn(req, res) {
    const { body: { email, password } } = req;
    const validUser = users.find(eachUser => eachUser.email === email && eachUser.password === password);
    if (validUser) {
      // copy user details and delete password
      // delete validUser[0].password;
      const token = auth.generateToken(validUser);
      return res.status(200).json({
        status: true,
        data: {
          token,
          user: validUser
        }
      });
    }
    return res.status(401).json({
      status: false,
      msg: 'Authentication failed'
    });
  }
};

export default userController;
