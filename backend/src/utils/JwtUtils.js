import jwt from 'jsonwebtoken';
import config from '../config/env.js';

export function generateJWT(entity) {
  let payload = {
      userId: entity._id
    };
  return jwt.sign(
    payload,
    config.jwt.secret,
    { expiresIn: config.jwt.expiry }
  );
}

export function verifyJWT(token) {
  try {
    return jwt.verify(token, config.jwt.secret);
  } catch (error) {
    return null;
  }
}