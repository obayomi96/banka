import users from '../data/users';

export default class Exists {
  static emailExist(email, validUser) {
    let existingEmail = false;
    let userDetails;
    users.forEach((user) => {
      if (user.email === email) {
        existingEmail = true;
        userDetails = user;
      }
    });
    if (validUser) {
      return { userDetails, existingEmail };
    }
    return existingEmail;
  }
}
