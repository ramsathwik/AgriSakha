import jwt from 'jsonwebtoken';
import config from '../config/env.js';

/**
 * Generates a JWT for a given entity and role.
 * @param {object} entity - The user object (e.g., Farmer or FarmingExpert), must have an _id property.
 * @param {string} role - The role of the user (e.g., 'farmer', 'expert').
 * @returns {string} The generated JWT.
 */
export function generateJWT(entity, role) {
  if (!entity._id || !role) {
    throw new Error('JWT generation requires entity with _id and a role.');
  }
  
  const payload = {
      userId: entity._id,
      role: role,
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