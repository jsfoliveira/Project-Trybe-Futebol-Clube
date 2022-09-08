import { Request, Response } from 'express';
import UserService from '../services/user.service';

export default class UserController {
  userService;

  constructor() {
    this.userService = new UserService();
  }

  login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const result = await this.userService.login(email, password);

    // Se o email digitado for diferente do encontrado no user, quer dizer que deu erro, então gerará um status e mensagem. Caso contrário, gerará o token.
    if (result.error === true) {
      return res.status(401).json({ message: 'Incorrect email or password' });
    }
    return res.status(200).json({ token: result.token });
  };

  verify = async (req: Request, res: Response) => {
    const token = req.headers.authorization as string;
    const result = await this.userService.verification(token);
    if (result) {
      return res.status(200).json({ role: result });
    }
  };
}
