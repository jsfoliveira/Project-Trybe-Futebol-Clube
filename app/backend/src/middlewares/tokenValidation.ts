import * as dotenv from 'dotenv';

import { Response, Request } from 'express';
import * as jwt from 'jsonwebtoken';

import IToken from '../interfaces/token.interface';

dotenv.config();
const secret = process.env.JWT_SECRET as jwt.Secret;

export default (req: Request, res: Response) => {
  const { authorization } = req.headers;

  if (authorization) {
    const decodeToken = jwt.verify(authorization, secret) as IToken;
    // body recebe o decode
    req.body(decodeToken);
    // se estiver vazio, vai dar esse erro
  } else if (!authorization) {
    res.status(401).json({ error: 'Token not found' });
  } else {
    res.status(401).json({ message: 'Token must be a valid token' });
  }
};
