// import jwt from 'jsonwebtoken';
import users from '../data/users';
import auth from '../auth/authenticate';

const userController = {
  // User Signup API endoint
  signUp(req, res) {
    const id = users.length + 1;
    const email = 'oluwaseun@gmail.com';
    const firstname = 'Oluwaseun';
    const lastname = 'Christopher';
    const password = 'userPW';
    const type = 'client';
    const isAdmin = false;

    const user = {
      id,
      email,
      firstname,
      lastname,
      password,
      type,
      isAdmin
    };
    const token = auth.generateToken({ email: user.email, type });

    users.push(user);
    console.log(users);
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
    const validUser = users.filter(eachUser => eachUser.email === email && eachUser.password === password);
    if (validUser.length) {
      delete validUser[0].password;
      const token = auth.generateToken({ user: validUser[0] });
      console.log(validUser);
      return res.status(200).json({
        status: true,
        data: {
          token,
          user: validUser[0]
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
