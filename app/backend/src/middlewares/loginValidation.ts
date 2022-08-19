import { NextFunction, Response, Request } from 'express';

import IUser from '../interfaces/user.interface';

export default class LoginValidation {
  public validation =
  async (req: Request, res:Response, next: NextFunction): Promise<(Response | void)> => {
    // pegar os dados da interface do user, que já estão tipados
    const { email, password } = req.body as IUser;

    // Se não informar o email e o password, deve retornar um status 400 e a mensagem
    if (!email) {
      return res.status(400).json({
        message: 'All fields must be filled',
      });
    }
    if (!password) {
      return res.status(400).json({
        message: 'All fields must be filled',
      });
    }
    return next();
  };
}
