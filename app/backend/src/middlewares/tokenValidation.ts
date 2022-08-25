import * as dotenv from 'dotenv';

import { Response, Request, NextFunction } from 'express';

import * as jwt from 'jsonwebtoken';
import IToken from '../interfaces/token.interface';

dotenv.config();

export default (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ error: 'Token not found' });
  try {
    const secret = process.env.JWT_SECRET as jwt.Secret;
    const decoded = jwt.verify(token, secret) as IToken;
    req.body.tokenData = decoded;

    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }
};
