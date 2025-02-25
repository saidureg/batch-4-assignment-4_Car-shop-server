import jwt, { JwtPayload } from 'jsonwebtoken';

export const createToken = (
  payload: JwtPayload,
  secret: string,
  expiresIn: string,
) => {
  return jwt.sign(payload, secret, { expiresIn: parseInt(expiresIn) });
};
