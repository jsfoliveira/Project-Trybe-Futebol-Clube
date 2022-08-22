import { Router, Request, Response } from 'express';
import MatchController from '../controllers/match.controller';

const matchRouter = Router();

const matchController = new MatchController();

const getAll = async (req: Request, res: Response) => {
  await matchController.getAll(req, res);
};

matchRouter.get('/', getAll);

export default matchRouter;
