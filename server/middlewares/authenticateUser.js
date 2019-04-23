import auth from '../auth/authenticate';

export default class AuthenticateUsers {
  /**
    * @method verifyUser
    * @description Verifies a user account
    * @param {object} req - The Request Object
    * @param {object} res - The Response Object
    * @param {function} next - Next function to point to the next middleware
    * @returns {function} next() - The next function
    */

  static verifyUser(req, res, next) {
    try {
      const token = req.headers.authorization.split(' ')[1];
      const decoded = auth.verifyToken(token);
      req.user = decoded;
      return next();
    } catch (error) {
      return res.status(401).send({
        status: res.statusCode,
        error: 'Authentication failed'
      });
    }
  }

  /**
    * @method verifyStaff
    * @description Verifies a user staff account
    * @param {object} req - The Request Object
    * @param {object} res - The Response Object
    * @param {function} next - Next function to point to the next middleware
    * @returns {function} next() - The next function
    */
  static verifyStaff(req, res, next) {
    try {
      const token = req.headers.authorization.split(' ')[1];
      const decoded = auth.verifyToken(token);
      req.user = decoded;
      if (req.user.type !== 'staff') {
        return res.status(403).send({
          status: res.statusCode,
          error: 'The endpoint you are requested is not authorized to you'
        });
      }
      return next();
    } catch (error) {
      return res.status(401).send({
        status: res.statusCode,
        error: 'Authentiction failed'
      });
    }
  }

  /**
    * @method verifyAdmin
    * @description Verifies a user admin account
    * @param {object} req - The Request Object
    * @param {object} res - The Response Object
    * @param {function} next - Next function to point to the next middleware
    * @returns {function} next() - The next function
    */
  static verifyAdmin(req, res, next) {
    try {
      const token = req.headers.authorization.split(' ')[1];
      const decoded = auth.verifyToken(token);
      req.user = decoded;
      if (!req.user.isAdmin) {
        return res.status(403).send({
          status: res.statusCode,
          error: 'The endpoint you are requesting is not authorized to you'
        });
      }
      return next();
    } catch (error) {
      return res.status(401).send({
        status: res.statusCode,
        error: 'Authentication failed'
      });
    }
  }
}
