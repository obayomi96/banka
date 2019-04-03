import auth from '../auth/authenticate';

const authenticateUsers = {
  verifyUser(req, res, next) {
    try {
      const token = req.headers.authorization.split(' ')[1];
      const decoded = auth.verifyToken(token);
      req.user = decoded;
      return next();
    } catch (error) {
      return res.status(401).send({
        status: res.statusCode,
        error: 'Authentication failed',
      });
    }
  }
};

export default authenticateUsers;
