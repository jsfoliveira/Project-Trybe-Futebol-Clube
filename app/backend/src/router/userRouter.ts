import { Router } from 'express';
import UserController from '../controllers/user.controller';
import LoginValidate from '../middlewares/loginValidation';

const userRouter = Router();

const loginValidation = new LoginValidate();

const userController = new UserController();

userRouter.post('/', loginValidation.validation, userController.login);

userRouter.get('/validate', userController.verify);

export default userRouter;
