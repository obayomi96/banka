// import jwt from 'jsonwebtoken';
import users from '../data/users';

const userController = {
  // Signup API endoint
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
    users.push(user);
    console.log(users);
    return res.status(200).json({
      status: true,
      data: {
        id: user.id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
      }
    });
  } // Signup API endpoint ends
};

export default userController;
