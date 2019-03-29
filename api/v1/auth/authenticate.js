import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const secretKey = process.env.SECRET;

const auth = {
  generateToken(payload) {
    const token = jwt.sign(payload, secretKey, { expiresIn: '2 days' });
    return token;
  },
  verifyToken(token) {
    const decoded = jwt.verify(token, secretKey);
    return decoded;
  }
};

export default auth;
