import { Router, Request, Response } from 'express';
import MatchController from '../controllers/match.controller';
import Validation from '../middlewares/tokenValidation';

const matchRouter = Router();

const matchController = new MatchController();

const getAll = async (req: Request, res: Response) => {
  await matchController.getAll(req, res);
};

matchRouter.get('/', getAll);

const create = async (req: Request, res: Response) => {
  await matchController.create(req, res);
};

matchRouter.post('/', Validation, create);

const finished = async (req: Request, res: Response) => {
  await matchController.update(req, res);
};

matchRouter.patch('/:id/finish', finished);

const updateIdMatch = async (req: Request, res: Response) => {
  await matchController.updateIdMatch(req, res);
};

matchRouter.patch('/:id', updateIdMatch);

export default matchRouter;
