import { Router, Request, Response } from 'express';
import UserController from '../controllers/user.controller';
import LoginBodyValidate from '../middlewares/loginValidation';

const userRouter = Router();
const bodyValidation = new LoginBodyValidate();

const userController = new UserController();

const login = async (req: Request, res: Response) => {
  await userController.login(req, res);
};

userRouter.post('/', bodyValidation.validation, login);

export default userRouter;
