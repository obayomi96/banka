import auth from '../auth/authenticate';

const authenticateUsers = {
  // Authenticate user (client)
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
  },
  // Authenticate user (staff)
  verifyStaff(req, res, next) {
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
        error: 'Authentiction failed',
      });
    }
  },
  // Authenticate user (Admin)
  verifyAdmin(req, res, next) {
    try {
      const token = req.headers.authorization.split(' ')[1];
      const decoded = auth.verifyToken(token);
      req.user = decoded;
      if (req.user.isAdmin !== true) {
        return res.status(403).send({
          status: true,
          error: 'The endpoint you are requesting is not authorized to you'
        });
      }
      return next();
    } catch (error) {
      return res.status(401).send({
        status: false,
        error: 'Authentication failed'
      });
    }
  }
};

export default authenticateUsers;
