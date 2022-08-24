import { Router, Request, Response } from 'express';
import MatchController from '../controllers/match.controller';

const matchRouter = Router();

const matchController = new MatchController();

const getAll = async (req: Request, res: Response) => {
  await matchController.getAll(req, res);
};

matchRouter.get('/', getAll);

const create = async (req: Request, res: Response) => {
  await matchController.create(req, res);
};

matchRouter.post('/', create);

const finished = async (req: Request, res: Response) => {
  await matchController.update(req, res);
};

matchRouter.patch('/:id/finish', finished);

export default matchRouter;
