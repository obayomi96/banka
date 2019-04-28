import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const secretKey = process.env.SECRET;

export default class Auth {
  /**
    * @method generateToken
    * @description generates a token for each user
    * @param {object} - payload - object to check the token on
    * @returns {string} token- jwt token
    */
  static generateToken(payload) {
    const token = jwt.sign(payload, secretKey, { expiresIn: '5 days' });
    return token;
  }

  /**
    * @method verifyToken
    * @description verifies the token assigned to a user
    * @param {object} - Payload - object to check the token on
    * @method  decoded - jwt verify token method
    */
  static verifyToken(token) {
    const decoded = jwt.verify(token, secretKey);
    return decoded;
  }
}
