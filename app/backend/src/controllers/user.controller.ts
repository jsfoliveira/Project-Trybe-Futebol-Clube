import { Request, Response } from 'express';
import UserService from '../services/user.service';

export default class UserController {
  public userService;

  constructor() {
    this.userService = new UserService();
  }

  public async login(req: Request, res: Response):Promise<Response> {
    const result = await this.userService.login(req.body);

    if (result.status === 401) {
      return res.status(result.status).json({ message: result.message });
    }
    return res.status(result.status).json({ token: result.token });
  }
}
