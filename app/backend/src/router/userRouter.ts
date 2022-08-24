import { Router, Request, Response } from 'express';
import UserController from '../controllers/user.controller';
import LoginValidate from '../middlewares/loginValidation';

const userRouter = Router();

const loginValidation = new LoginValidate();

const userController = new UserController();

const login1 = async (req: Request, res: Response) => {
  await userController.login(req, res);
};

userRouter.post('/', loginValidation.validation, login1);

const login2 = async (req: Request, res: Response) => {
  await userController.verify(req, res);
};

userRouter.get('/validate', login2);

export default userRouter;
