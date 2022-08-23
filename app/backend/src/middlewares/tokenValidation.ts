import * as dotenv from 'dotenv';

import { Response, Request } from 'express';

import * as jwt from 'jsonwebtoken';

dotenv.config();

const secret = process.env.JWT_SECRET as string;

export default class TokenValidate {
  public validate = async (req: Request, res:Response): Promise<(Response | void)> => {
    const token = req.headers.authorization as string;

    const verify = jwt.verify(token, secret);
    if (!verify) {
      return res.status(400).json({ error: 'Invalid Token' });
    }
  };
}
